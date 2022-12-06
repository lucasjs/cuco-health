import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import CH from 'src/types'

const ActionButtons: React.FC<CH.ActionButtons> = ({
  isLoaded = false,
  primaryAction = () => ({}),
  secondaryAction = () => ({})
}) => {
  return (
    <HStack justifyContent="flex-end" mt={6}>
      <Button
        colorScheme="blue"
        bg="brand.blue"
        disabled={!isLoaded}
        onClick={secondaryAction}
      >
        Cancelar
      </Button>
      <Button
        colorScheme="green"
        bg="brand.green"
        disabled={!isLoaded}
        onClick={primaryAction}
      >
        Salvar
      </Button>
    </HStack>
  )
}

export default ActionButtons
