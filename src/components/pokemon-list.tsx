"use client";

// react
import { useState } from "react";

// next
import Image from "next/image";

// components
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

// icons
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

// Fonction pour générer un dégradé en fonction des types
const getBackgroundGradient = (types: string[]) => {
  const typeColors: { [key: string]: string } = {
    Feu: "#FF5733",
    Eau: "#3498db",
    Plante: "#4CAF50",
    Poison: "#9C27B0",
    Vol: "#78C7FF",
    Électrik: "#FFD700",
    Roche: "#8B4513",
    Sol: "#D2691E",
    Glace: "#00FFFF",
    Combat: "#FF4500",
    Spectre: "#800080",
    Psy: "#FF69B4",
    Dragon: "#6A5ACD",
    Insecte: "#ADFF2F",
    Acier: "#708090",
    Fée: "#FFB6C1",
    Ténèbres: "#2F4F4F",
    Normal: "#A9A9A9",
  };

  const colors = types.map((type) => typeColors[type] || "#ccc");

  if (colors.length === 1) return colors[0];
  if (colors.length === 2)
    return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
  return `linear-gradient(to bottom, ${colors[0]}, ${colors[1]}, ${colors[2]})`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PokemonList({ pokemons }: { pokemons: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  // Récupérer tous les types disponibles (sans doublons)
  const allTypes = Array.from(
    new Set(
      pokemons.flatMap((pokemon) =>
        pokemon.apiTypes.map((t: { name: string }) => t.name)
      )
    )
  );

  // Filtrage dynamique
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 ||
      pokemon.apiTypes.some((type: { name: string }) =>
        selectedTypes.includes(type.name)
      );
    return matchesSearch && matchesType;
  });

  // Pagination : sélection des Pokémon à afficher
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Pokémon</h1>

      {/* Nombre total de Pokémon */}
      <p className="mb-4 text-lg font-medium">
        Nombre total de Pokémon : {filteredPokemons.length}
      </p>

      {/* Barre de recherche */}
      <Input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      {/* Filtres par types */}
      <div className="mb-4 flex flex-wrap gap-2">
        {allTypes.map((type) => {
          // Récupérer l'image du type pour l'affichage
          const typeImage = pokemons
            .find((pokemon) => pokemon.apiTypes.some((t: { name: string }) => t.name === type))
            ?.apiTypes.find((t: { name: string }) => t.name === type)?.image;

          return (
            <label
              key={type}
              className="flex items-center gap-2 border p-2 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() =>
                  setSelectedTypes((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type]
                  )
                }
              />
              {typeImage && (
                <Image
                  src={typeImage}
                  alt={type}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              {type}
            </label>
          );
        })}
      </div>

      {/* Liste des Pokémon paginés */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedPokemons.map((pokemon) => {
          const types = pokemon.apiTypes.map((t: { name: string }) => t.name);
          const background = getBackgroundGradient(types);

          return (
            <Card
              key={pokemon.id}
              className="border p-4 flex flex-col items-center text-white"
              style={{ background }}
            >
              <CardHeader className="flex flex-col items-center">
                <span className="text-gray-100">
                  #{String(pokemon.pokedexId).padStart(3, "0")}
                </span>
                <CardTitle className="font-bold">{pokemon.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  className="mb-2"
                />
                {/* Affichage des types */}
                <div className="flex gap-2 mb-2">
                  {pokemon.apiTypes.map(
                    (type: { name: string; image: string }) => (
                      <div
                        key={type.name}
                        className="flex items-center gap-1 bg-gray-100 p-1 rounded"
                      >
                        <Image
                          src={type.image}
                          alt={type.name}
                          width={20}
                          height={20}
                        />
                        <span className="text-sm text-black">{type.name}</span>
                      </div>
                    )
                  )}
                </div>

                {/* Stats HP, Attaque, Défense */}
                <div className="flex items-center gap-2 bg-neutral-100 p-4 rounded text-black">
                  <p className="flex items-center gap-1">
                    {" "}
                    <Image
                      src="/svg/heart.svg"
                      alt="coeur"
                      width={20}
                      height={20}
                    />
                    HP {pokemon.stats.HP}
                  </p>
                  <p className="flex items-center gap-1">
                    {" "}
                    <Image
                      src="/svg/sword.svg"
                      alt="coeur"
                      width={20}
                      height={20}
                    />
                    ATK {pokemon.stats.attack}
                  </p>
                  <p className="flex items-center gap-1">
                    {" "}
                    <Image
                      src="/svg/shield.svg"
                      alt="coeur"
                      width={20}
                      height={20}
                    />
                    DEF {pokemon.stats.defense}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded border cursor-pointer ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <HiChevronDoubleLeft />
        </Button>

        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded border cursor-pointer ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <HiChevronLeft />
        </Button>

        <span className="font-bold text-lg">
          Page {currentPage} / {totalPages}
        </span>

        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded border cursor-pointer ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <HiChevronRight />
        </Button>

        <Button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded border cursor-pointer ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <HiChevronDoubleRight />
        </Button>
      </div>
    </main>
  );
}
