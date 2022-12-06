import React from 'react'
import { ReactComponent as Logo } from 'src/assets/logo-cuco-health.svg'
import {
  Flex,
  Box,
  Button,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export type HeaderProps = {
  title: string;
  isHome?: boolean;
};

const Header = ({ title, isHome = false }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('brand.blue', 'blue.900')

  return (
    <Box bg={bg} as="header">
      <Container maxW="1120px" pt={8} pb={24}>
        <Flex justifyContent="space-between" mb={20}>
          <Logo />
          <Flex flexDirection="column" alignItems="flex-end">
            {isHome && (
              <Link to="/new-client">
                <Button bg="brand.pink" colorScheme="pink" mb={5}>
                  Novo cliente
                </Button>
              </Link>
            )}
            <IconButton
              aria-label="Mudar tema"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            />
          </Flex>
        </Flex>
        <Heading color="white">{title}</Heading>
      </Container>
    </Box>
  )
}

export default Header
