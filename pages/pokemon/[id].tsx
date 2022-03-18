import { useState } from 'react';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces/';
import { localFavorites } from '../../utils';
import { getPokemonInfo } from '../../utils';
import { PokemonByNameOrId } from '@components/ui/';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
  const pokemons151 = [...Array(151)].map((value, idx) => `${idx + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    // fallback: false,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

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
    revalidate: 864000,
  };
};

export default PokemonPage;
