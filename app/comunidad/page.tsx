"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  topicId: number;
}

interface Member {
  id: number;
  name: string;
  avatar: string;
}

interface PopularTopic {
  id: number;
  title: string;
  publications: number;
}

interface CommunityData {
  comments: Comment[];
  members: Member[];
  popularTopics: PopularTopic[];
}

export default function ComunidadPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [popularTopics, setPopularTopics] = useState<PopularTopic[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedTopicForComment, setSelectedTopicForComment] =
    useState<number>(1);

  useEffect(() => {
    // Cargar datos del archivo JSON
    fetch("/comments.json")
      .then((res) => res.json())
      .then((data: CommunityData) => {
        setComments(data.comments);
        setMembers(data.members);
        setPopularTopics(data.popularTopics);
      })
      .catch((error) => console.error("Error loading comments:", error));
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "Usuario Actual",
        avatar: "/imgs/avatars/default.jpg",
        timestamp: "Ahora",
        content: newComment,
        topicId: selectedTopicForComment,
      };
      setComments([comment, ...comments]);
      setNewComment("");

      // Actualizar contador del tema
      setPopularTopics(
        popularTopics.map((topic) =>
          topic.id === selectedTopicForComment
            ? { ...topic, publications: topic.publications + 1 }
            : topic
        )
      );
    }
  };

  // Filtrar comentarios por tema seleccionado
  const filteredComments = selectedTopic
    ? comments.filter((comment) => comment.topicId === selectedTopic)
    : comments;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Comunidad</h1>

        {/* Topic Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTopic(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTopic === null
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Todos los temas
          </button>
          {popularTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedTopic === topic.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Comments Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Comment Box */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Tema
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTopicForComment}
                      onChange={(e) =>
                        setSelectedTopicForComment(Number(e.target.value))
                      }
                      className="w-full appearance-none bg-gray-50 px-4 py-3 rounded-lg text-gray-900 font-medium cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all border-none"
                    >
                      {popularTopics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.title}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Comparte tus pensamientos..."
                  className="w-full p-4 bg-gray-50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-gray-900 border-none"
                  rows={4}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <SendIcon sx={{ fontSize: 18 }} />
                    Publicar
                  </button>
                </div>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                  No hay comentarios en este tema todavía. ¡Sé el primero en
                  comentar!
                </div>
              ) : (
                filteredComments.map((comment) => {
                  const commentTopic = popularTopics.find(
                    (t) => t.id === comment.topicId
                  );
                  return (
                    <div
                      key={comment.id}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-12 w-12">
                          <Image
                            src={comment.avatar}
                            alt={comment.author}
                            width={48}
                            height={48}
                            className="object-cover rounded-full"
                            onError={(e) => {
                              console.log(
                                "Error loading avatar, using default.",
                                e
                              );
                              const img = e.target as HTMLImageElement;
                              img.src = "/imgs/avatars/default.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-black">
                              {comment.author}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {comment.timestamp}
                            </span>
                            {commentTopic && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                                {commentTopic.title}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Members Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-black">Miembros</h2>
              <div className="grid grid-cols-3 gap-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col relative items-center"
                  >
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/imgs/avatars/default.jpg";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-black">
                Temas populares
              </h2>
              <div className="space-y-4">
                {popularTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full text-left border-b border-gray-200 pb-3 hover:bg-gray-50 transition-colors rounded px-2 ${
                      selectedTopic === topic.id ? "bg-gray-100" : ""
                    }`}
                  >
                    <h3 className="font-semibold text-black mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {topic.publications} publicaciones
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
