import { Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from '../pokemon';

interface Props {
  pokemons: number[];
}

export const FavoritePokemon: React.FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavoriteCardPokemon key={id} pokemonId={id} />
      ))}
    </Grid.Container>
  );
};
