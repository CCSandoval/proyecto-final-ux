"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Article {
  id: number;
  slug: string;
  image: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
}

interface ArticlesData {
  articles: Article[];
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load article metadata from JSON
    fetch("/articles.json")
      .then((res) => res.json())
      .then((data: ArticlesData) => {
        const foundArticle = data.articles.find((a) => a.slug === slug);
        setArticle(foundArticle || null);
        
        if (foundArticle) {
          // Load markdown content
          fetch(`/articles/${slug}.md`)
            .then((res) => res.text())
            .then((markdown) => {
              setMarkdownContent(markdown);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error loading markdown:", error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error loading article:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[95vw] md:max-w-[70vw] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[95vw] md:max-w-[70vw] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-black mb-4">
            Artículo no encontrado
          </h1>
          <Link
            href="/"
            className="text-red-500 hover:underline inline-flex items-center gap-2"
          >
            <ArrowBackIcon /> Volver al inicio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Image */}
      <div className="relative w-full h-[60vh] bg-black">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button Overlay */}
        <div className="absolute top-8 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-white hover:text-gray-300 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowBackIcon /> Volver a noticias
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[95vw] md:max-w-[70vw] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-200">
            <span className="font-medium text-white">{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[85vw] md:max-w-[60vw] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* White Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Article Excerpt */}
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-12 font-medium italic border-l-4 border-red-500 pl-6 py-4">
            {article.excerpt}
          </p>

          {/* Article Body */}
          <div className="article-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>

          {/* Author Info Card */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Escrito por</p>
                <p className="text-xl font-bold text-black">{article.author}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-8 text-center pb-16">
          <p className="text-gray-500 text-sm">
            ¿Te gustó este artículo? Compártelo con otros fanáticos de la F1
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
