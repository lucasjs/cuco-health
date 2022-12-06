import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from 'src/containers/Header'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'

export type HeaderProps = {
  title?: string;
  isHome?: boolean;
  children: React.ReactNode;
};

const Layout = ({ title = 'Clientes', isHome, children }: HeaderProps) => {
  return (
    <>
      <SkipNavLink>Pular para o conteúdo</SkipNavLink>
      <Header title={title} isHome={isHome} />
      <main>
        <Container maxW="1120px" mt={-8} mb={10}>
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </>
  )
}

export default Layout
