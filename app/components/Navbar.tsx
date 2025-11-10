import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-black border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/imgs/logo.png"
              alt="Pole Position F1 Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-white">
            Pole Position F1
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-gray-300 font-medium">
            Noticias
          </Link>
          <Link href="/pilotos" className="text-white hover:text-gray-300 font-medium">
            Pilotos
          </Link>
          <Link href="/carreras" className="text-white hover:text-gray-300 font-medium">
            Carreras
          </Link>
          <Link
            href="/comunidad"
            className="px-4 py-2 border border-white rounded-md font-bold text-white hover:bg-white hover:text-black! transition-colors duration-1000"
          >
            Comunidad
          </Link>
        </div>
      </nav>
    </header>
  );
}
