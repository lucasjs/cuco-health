import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { getClients, deleteClient, getByName, getByCpf } from 'src/api'
import CH from 'src/types'
import TableSkeleton from 'src/components/TableSkeleton'
import AlertDialog from 'src/containers/AlertDialog'
import Layout from 'src/containers/Layout'
import { ReactComponent as SearchIcon } from 'src/assets/search-icon.svg'
import { ReactComponent as TrashIcon } from 'src/assets/trash-icon.svg'
import { ReactComponent as PencilIcon } from 'src/assets/pencil-icon.svg'

const Clients = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [clients, setClients] = React.useState<CH.Client[]>()
  const [totalClients, setTotalClients] = React.useState<number | undefined>()
  const [lastPage, setLastPage] = React.useState<number | undefined>()
  const [page, setPage] = React.useState<number>(1)
  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
    false
  ])
  const [selectedIds, setSelectedIds] = React.useState<any>([])
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [resultsQuantity, setResultsQuantity] = React.useState<number | null>()

  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

  const limit: number = 5
  const allChecked = checkedItems?.every(Boolean)
  const isIndeterminate = checkedItems?.some(Boolean) && !allChecked

  const getClientsFromApi = useCallback(async (page: number) => {
    const response = await getClients(page, limit)

    if (response?.status === 200) {
      setTotalClients(Number(response?.headers['x-total-count']))
      setClients(response?.data)
      setLastPage(Math.round(Number(response?.headers['x-total-count']) / 5))
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000)
    } else {
      toast({
        title: 'Algo deu errado. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
      setIsLoaded(true)
    }
  }, [toast])

  React.useEffect(() => {
    getClientsFromApi(page)
  }, [page, getClientsFromApi])

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = clients
      ? clients.map(() => e.target.checked)
      : [false, false, false, false, false]
    setCheckedItems(checkAll)

    const allIds = clients?.map((client) => client.id)
    setSelectedIds(selectedIds.length === clients?.length ? [] : allIds)
  }

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheckedItems([
      ...checkedItems.slice(0, index),
      e.target.checked,
      ...checkedItems.slice(index + 1)
    ])
    setSelectedIds(selectedIds.includes(e.target.value)
        ? selectedIds.filter((item: string) => item !== e.target.value)
        : [...selectedIds, e.target.value])
  }

  const changePage = async (newPage: number) => {
    setIsLoaded(false)
    setPage(newPage)
    await getClientsFromApi(page)
    setCheckedItems(checkedItems.map(() => false))
    setSelectedIds([])

    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }

  const renderClientsQuantity = () => {
    const initialQuantity = page * limit - (limit - 1)
    const endQuantity = page === lastPage ? totalClients : page * limit
    return (
      <>
        {initialQuantity} - {endQuantity}
      </>
    )
  }

  const handleDeleteClients = () => {
    selectedIds.map((clientId: string) => deleteConfirm(clientId))
    onClose()
    getClientsFromApi(page)
    setSelectedIds([])
    setCheckedItems(checkedItems.map(() => false))
    setIsLoaded(false)

    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }

  const deleteConfirm = async (clientId: string) => {
    const response = await deleteClient(clientId)

    if (response?.status === 200) {
      toast({
        title: 'Usuário excluído(s) com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
    } else {
      toast({
        title: 'Algo deu errado. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
    }
  }

  const handleEdit = (clientId: string) => {
    navigate(`/edit-client/${clientId}`)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoaded(false)
    setSearchTerm(event.target.value)
    searchCheck(event.target.value)
  }

  const searchCheck = (searchTerm: string) => {
    const isCpf = /^([0-9])/.test(searchTerm)
    const isName = /^([a-zA-Z])/.test(searchTerm)

    const resetSearch = async () => {
      setIsLoaded(false)
      getClientsFromApi(page)
      setResultsQuantity(null)

      setTimeout(() => {
        setIsLoaded(true)
      }, 1000)
    }

    const getData = setTimeout(() => {
      if (isCpf) {
        searchByCpf(searchTerm)
      } else if (isName) {
        searchByName(searchTerm)
      } else {
        resetSearch()
      }
    }, 1000)

    return () => clearTimeout(getData)
  }

  const searchByName = async (searchTerm: string) => {
    const response = await getByName(searchTerm)
    setClients(response?.data.slice(0, 5))
    setResultsQuantity(response?.data.length)
    setIsLoaded(true)
  }

  const searchByCpf = async (searchTerm: string) => {
    const response = await getByCpf(searchTerm)
    setClients(response?.data.slice(0, 5))
    setResultsQuantity(response?.data.length)
    setIsLoaded(true)
  }

  const inputBg = useColorModeValue('white', 'gray.800')
  const tableBg = useColorModeValue('white', 'gray.700')
  const titleColor = useColorModeValue('brand.title', 'white')

  return (
    <Layout isHome>
      <InputGroup size="lg">
        <Input
          bg={inputBg}
          placeholder="Digite aqui um nome ou CPF..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      {clients?.length !== 0 && (
        <TableContainer>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 16px' }}>
            <Thead>
              <Tr>
                <Th width={20} border={0} pb={0}>
                  {clients && (
                    <Checkbox
                      isChecked={allChecked}
                      isIndeterminate={isIndeterminate}
                      onChange={(event) => handleCheckAll(event)}
                      disabled={!isLoaded || clients?.length === 0}
                      colorScheme="red"
                    ></Checkbox>
                  )}
                </Th>
                <Th border={0} pb={0}>
                  <Text fontSize="md" fontWeight="semibold" color="brand.text">
                    Nome
                  </Text>
                </Th>
                <Th border={0} pb={0}>
                  <Text fontSize="md" fontWeight="semibold" color="brand.text">
                    Data de nascimento
                  </Text>
                </Th>
                <Th border={0} pb={0}>
                  <Text fontSize="md" fontWeight="semibold" color="brand.text">
                    Telefone
                  </Text>
                </Th>
                {selectedIds.length !== 0 && (
                  <Th border={0} pb={0} textAlign="right">
                    <Button
                      colorScheme="red"
                      bg="brand.red"
                      onClick={onOpen}
                      leftIcon={<TrashIcon />}
                    >
                      Excluir
                    </Button>
                  </Th>
                )}
              </Tr>
            </Thead>

            <Tbody>
              {!isLoaded && <TableSkeleton quantity={limit} />}

              {isLoaded &&
                clients?.map((client, index) => (
                  <Tr key={client.id} bg={tableBg}>
                    <Td border={0}>
                      <Checkbox
                        isChecked={checkedItems[index]}
                        onChange={(event) => handleChecked(event, index)}
                        value={client.id}
                        colorScheme="red"
                      ></Checkbox>
                    </Td>
                    <Td border={0}>
                      <Text as="span" fontWeight="semibold" color={titleColor}>
                        {client.name}
                      </Text>
                      <br />
                      <Text as="span" fontSize="sm" color="brand.text">
                        {client.cpf}
                      </Text>
                    </Td>
                    <Td border={0}>
                      <Text as="span" color="brand.text">
                        {client.birthdate}
                      </Text>
                    </Td>
                    <Td border={0}>
                      <Text as="span" color="brand.text">
                        {client.phone}
                      </Text>
                    </Td>
                    <Td border={0} textAlign="right">
                      <Button
                        colorScheme="green"
                        bg="brand.green"
                        onClick={() => handleEdit(client.id)}
                        leftIcon={<PencilIcon />}
                      >
                        Editar
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {isLoaded && clients && clients?.length === 0 && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Nenhum usuário encontrado!</AlertTitle>
          <AlertDescription>Tente novamente.</AlertDescription>
        </Alert>
      )}

      {isLoaded && clients?.length !== 0 && resultsQuantity && (
        <Flex justifyContent="space-between" alignItems="flex-end" mt={5}>
          <div>
            <Text as="span" color="brand.text">
              <strong>1 - {clients?.length}</strong> de {resultsQuantity}{' '}
              resultados encontrados.
            </Text>
          </div>
        </Flex>
      )}

      {isLoaded && clients && clients?.length !== 0 && !resultsQuantity && (
        <Flex justifyContent="space-between" alignItems="flex-end" mt={5}>
          <div>
            <Text as="span" color="brand.text" fontSize="sm">
              <strong>{renderClientsQuantity()}</strong> de{' '}
              <strong>{totalClients}</strong>
            </Text>
          </div>
          <div>
            {page > 2 && (
              <Button
                colorScheme="gray"
                size="xs"
                variant="ghost"
                onClick={() => changePage(1)}
                color="brand.text"
              >
                1
              </Button>
            )}
            {page > 3 && (
              <Text as="span" color="brand.text" ml={2} mr={2}>
                ...
              </Text>
            )}
            {page > 1 && (
              <Button
                colorScheme="gray"
                size="xs"
                variant="ghost"
                onClick={() => changePage(page - 1)}
                color="brand.text"
              >
                {page - 1}
              </Button>
            )}
            <Button bg="brand.blue" colorScheme="blue" size="xs">
              {page}
            </Button>
            {page !== lastPage && (
              <Button
                colorScheme="gray"
                size="xs"
                variant="ghost"
                onClick={() => changePage(page + 1)}
                color="brand.text"
              >
                {page + 1}
              </Button>
            )}
            {lastPage && page < lastPage - 2 && (
              <Text as="span" color="brand.text" ml={2} mr={2}>
                ...
              </Text>
            )}
            {lastPage && page < lastPage - 1 && (
              <Button
                colorScheme="gray"
                size="xs"
                variant="ghost"
                onClick={() => changePage(lastPage)}
                color="brand.text"
              >
                {lastPage}
              </Button>
            )}
          </div>
        </Flex>
      )}

      <AlertDialog
        action="Excluir"
        text="Você tem certeza que quer excluir os cliente(s) selecionado(s)?"
        primaryAction={handleDeleteClients}
        secondaryAction={onClose}
        cancelRef={cancelRef}
        isOpen={isOpen}
      />
    </Layout>
  )
}

export default Clients
