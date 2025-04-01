export async function getPokemons() {
    const res = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des Pokémons");
    }
    return res.json();
  }
  