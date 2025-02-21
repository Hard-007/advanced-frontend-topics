import { useState, useEffect } from "react";

const Navbar = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full px-8 py-4 transition-all duration-300 z-50 
      ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
    >
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Console.log
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            {isOpen ? (
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <div>
          <input
            className="hidden md:block bg-gray-100 text-gray-800 px-4 py-2 border rounded-lg w-72 focus:outline-none"
            type="text"
            placeholder="Pesquisar..."
          />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {["Início", "Artigos"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-500 text-base hover:text-blue-600 transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-base 
            transition-all hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Começar
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-white transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-4">
          {["Início", "Artigos"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block py-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}

          <button
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 
            rounded-lg text-base transition-colors hover:bg-blue-700"
          >
            Começar
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-white"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
