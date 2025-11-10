"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import BarChartIcon from "@mui/icons-material/BarChart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface Article {
  id: number;
  slug: string;
  image: string;
  title: string;
  author: string;
  excerpt: string;
}

interface ArticlesData {
  articles: Article[];
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/articles.json")
      .then((res) => res.json())
      .then((data: ArticlesData) => {
        setArticles(data.articles);
      })
      .catch((error) => console.error("Error loading articles:", error));
  }, []);

  const sections = [
    {
      icon: PersonIcon,
      title: "Pilotos",
      description:
        "Conoce las historias, estadísticas y trayectorias de tus pilotos favoritos.",
      link: "/pilotos",
    },
    {
      icon: FlagIcon,
      title: "Carreras",
      description:
        "Sigue los resultados, calendarios y análisis de cada Gran Premio.",
      link: "/carreras",
    },
    {
      icon: BarChartIcon,
      title: "Análisis",
      description:
        "Descubre estrategias, rendimiento y datos técnicos de la Fórmula 1.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Vive la emoción de la{" "}
              <span className="text-red-500">Formula 1</span> desde una nueva
              perspectiva
            </h1>
            <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
              Explorar artículos
            </button>
          </div>
          <div className="relative h-80 md:h-96">
            <Image
              src="/imgs/hero-car.png"
              alt="Formula 1 Car"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articulos/${article.slug}`}
              className="group cursor-pointer"
            >
              <article>
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{article.author}</p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {article.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Information Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-6 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-gray-800">
                  <IconComponent sx={{ fontSize: 48 }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <a
                    href={section.link}
                    className="text-red-500 hover:underline inline-flex items-center gap-1"
                  >
                    Ver más →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
