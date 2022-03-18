import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { FavoritePokemon } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="PokemonApp - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemon pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default Favorites;
