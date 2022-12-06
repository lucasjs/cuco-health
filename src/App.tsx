import React from 'react'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { StyleFunctionProps, mode } from '@chakra-ui/theme-tools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Clients, NewClient, EditClient } from 'src/pages'

const theme = extendTheme({
  colors: {
    brand: {
      pink: '#EE2279',
      blue: '#2095F2',
      green: '#12A454',
      red: '#E52E4D',
      title: '#363F5F',
      text: '#969CB2',
      background: '#F0F2F5'
    }
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Roboto, sans-serif'
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('#F0F2F5', 'gray.800')(props)
      }
    })
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Clients />
  },
  {
    path: 'edit-client/:clientId',
    element: <EditClient />
  },
  {
    path: 'new-client',
    element: <NewClient />
  }
])

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
