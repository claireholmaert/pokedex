import { getPokemons } from "@/lib/get-pokemons";
import PokemonList from "@/components/pokemon-list";

export default async function Home() {
  const pokemons = await getPokemons();
  return <PokemonList pokemons={pokemons} />;
}
