import NextLink from 'next/link';
import Image from 'next/image';
import { Link, Spacer, Text, useTheme } from '@nextui-org/react';

const styles = (theme: any): React.CSSProperties => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '0 20px',
  backgroundColor: theme?.colors.gray900.value,
});

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div style={styles(theme)}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        alt="icono de la app"
        width={70}
        height={70}
      />
      <NextLink href="/" passHref>
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okemon
          </Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Link>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
