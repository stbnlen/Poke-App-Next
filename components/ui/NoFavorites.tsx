import { Container, CSS, Image, Text } from '@nextui-org/react';

const styles: CSS = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 100px)',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
};

export const NoFavorites = () => {
  return (
    <Container css={styles}>
      <Text h1>No hay Favoritos</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        width={250}
        height={250}
        alt="Sin Favoritos"
        css={{
          opacity: 0.1,
        }}
      />
    </Container>
  );
};
