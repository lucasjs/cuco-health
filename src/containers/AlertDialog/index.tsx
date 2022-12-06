import React from 'react'
import { ReactComponent as AlertIcon } from 'src/assets/alert-icon.svg'
import {
  Flex,
  Button,
  Heading,
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import CH from 'src/types'

const AlertDialog: React.FC<CH.AlertDialog> = ({
  action = '',
  text = '',
  primaryAction = () => ({}),
  secondaryAction = () => ({}),
  cancelRef,
  isOpen
}) => {
  const titleColor = useColorModeValue('brand.title', 'white')

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={secondaryAction}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent alignItems="center">
          <AlertDialogHeader>
            <Flex alignItems="center" flexDirection="column">
              <AlertIcon />
              <Heading
                as="h2"
                fontSize="lg"
                color={titleColor}
                fontWeight="medium"
                mt={5}
              >
                Atenção
              </Heading>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontSize="sm" color="brand.text" align="center">
              {text}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={secondaryAction} variant="ghost">
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              bg="brand.red"
              onClick={primaryAction}
              ml={3}
            >
              {action}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  )
}

export default AlertDialog
