"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Driver {
  id: number;
  name: string;
  number: number;
  team: string;
  nationality: string;
  championships: number;
  image: string;
  bio: string;
}

interface DriversData {
  drivers: Driver[];
}

export default function PilotosPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    fetch("/drivers.json")
      .then((res) => res.json())
      .then((data: DriversData) => {
        setDrivers(data.drivers);
      })
      .catch((error) => console.error("Error loading drivers:", error));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-black text-white py-16 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Pilotos de Fórmula 1</h1>
          <p className="text-xl text-gray-300">
            Conoce a los mejores pilotos de la temporada 2025
          </p>
        </div>
      </section>

      {/* Drivers Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
            >
              <p className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl absolute">
                {driver.number}
              </p>
              <Image
                src={driver.image}
                alt={driver.name}
                height={400}
                width={400}
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "/imgs/drivers/default.jpg";
                }}
              />
              {/* Driver Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {driver.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Equipo:</span> {driver.team}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Nacionalidad:</span>{" "}
                    {driver.nationality}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Campeonatos:</span>{" "}
                    {driver.championships > 0 ? (
                      <span className="text-yellow-600 font-bold">
                        {driver.championships} 🏆
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {driver.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
