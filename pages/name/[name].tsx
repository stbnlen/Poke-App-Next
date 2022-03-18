import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Layout } from '@components/layouts';
import { pokeApi } from '../../api/';
import { Pokemon, SmallPokemon, PokemonListReponse } from '@interfaces/';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { PokemonByNameOrId } from '@components/ui/';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  return (
    <Layout title={pokemon.name}>
      <PokemonByNameOrId
        pokemon={pokemon}
        isInFavorites={isInFavorites}
        onToggleFavorite={onToggleFavorite}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListReponse>('/pokemon?limit=151');
  const pokemonNames: string[] = data.results.map(
    (pokemon: SmallPokemon) => pokemon.name
  );
  return {
    paths: pokemonNames.map((name: string) => ({
      params: { name },
    })),
    // fallback: false,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 84600,
  };
};

export default PokemonByNamePage;
