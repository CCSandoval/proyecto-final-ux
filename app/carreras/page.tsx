"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Race {
  id: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  status: "completed" | "upcoming";
  winner: string | null;
  image: string;
  laps: number;
}

interface RacesData {
  races: Race[];
}

export default function CarrerasPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all");

  useEffect(() => {
    fetch("/races.json")
      .then((res) => res.json())
      .then((data: RacesData) => {
        setRaces(data.races);
      })
      .catch((error) => console.error("Error loading races:", error));
  }, []);

  const filteredRaces =
    filter === "all"
      ? races
      : races.filter((race) => race.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">
            Calendario de Carreras 2025
          </h1>
          <p className="text-xl text-red-100">
            Sigue todas las carreras de la temporada de Fórmula 1
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === "all"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Todas las carreras
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === "completed"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === "upcoming"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Próximas
          </button>
        </div>

        {/* Races Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => (
            <div
              key={race.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Race Image */}
              <div className="relative h-48">
                <Image
                  src={race.image}
                  alt={race.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/imgs/races/default.jpg";
                  }}
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    race.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {race.status === "completed" ? "Completada" : "Próxima"}
                </div>
              </div>

              {/* Race Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3">
                  {race.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold">Circuito:</span>{" "}
                    {race.circuit}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">País:</span> {race.country}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Fecha:</span> {race.date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Vueltas:</span> {race.laps}
                  </p>
                  {race.winner && (
                    <p className="text-gray-900 mt-3 pt-3 border-t border-gray-200">
                      <span className="font-semibold">🏆 Ganador:</span>{" "}
                      <span className="text-red-600 font-bold">
                        {race.winner}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
