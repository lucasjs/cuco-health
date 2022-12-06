import React from 'react'
import {
  Input,
  SimpleGrid,
  Alert,
  AlertTitle,
  AlertDescription,
  useToast,
  useColorModeValue,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { getClient, updateClient } from 'src/api'
import { useParams, useNavigate } from 'react-router-dom'
import CH from 'src/types'
import FormSkeleton from 'src/components/FormSkeleton'
import ActionButtons from 'src/containers/ActionsButtons'
import Layout from 'src/containers/Layout'
import returnName from 'src/helpers/returnName'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditClient = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [client, setClient] = React.useState<CH.Client>()

  let { clientId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  React.useEffect(() => {
    getClientFromApi(clientId)
  }, [clientId])

  const getClientFromApi = async (clientId: string | undefined) => {
    const response = await getClient(clientId)
    setClient(response?.data)

    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }

  const formik = useFormik({
    initialValues: {
      id: client?.id ?? '',
      name: client?.name ?? '',
      cpf: client?.cpf ?? '',
      birthdate: client?.birthdate ?? '',
      phone: client?.phone ?? ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Campo obrigatório')
        .required('Campo obrigatório'),
      cpf: Yup.string().min(11, 'CPF incorreto').required('Campo obrigatório'),
      birthdate: Yup.string()
        .min(8, 'Data incorreta')
        .required('Campo obrigatório'),
      phone: Yup.string().min(8, 'Telefone incorreto')
    }),
    onSubmit: async (values: CH.Client) => {
      if (clientId && values) {
        const response = await updateClient(clientId, values)

        if (response?.status === 200) {
          toast({
            title: values.name
              ? `Usuário ${returnName(values.name)} editado com sucesso.`
              : null,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          })
          returnToHome()
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
    }
  })

  const returnToHome = () => {
    navigate('/')
  }

  const inputBg = useColorModeValue('white', 'gray.800')

  return (
    <Layout title="Editar cliente">
      {!isLoaded && <FormSkeleton quantity={4} />}
      {isLoaded && client && (
        <form onSubmit={formik.handleSubmit}>
          {isLoaded && (
            <SimpleGrid columns={[1, null, 2]} spacingX={8} spacingY={6}>
              <FormControl
                isInvalid={
                  formik.touched.name && formik.errors.name !== undefined
                }
              >
                <Input
                  id="name"
                  bg={inputBg}
                  size="lg"
                  placeholder="Nome"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.cpf && formik.errors.cpf !== undefined
                }
              >
                <Input
                  id="cpf"
                  bg={inputBg}
                  size="lg"
                  placeholder="CPF"
                  {...formik.getFieldProps('cpf')}
                />
                {formik.touched.cpf && formik.errors.cpf ? (
                  <FormErrorMessage>{formik.errors.cpf}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.birthdate &&
                  formik.errors.birthdate !== undefined
                }
              >
                <Input
                  id="birthdate"
                  bg={inputBg}
                  size="lg"
                  placeholder="Data de Nascimento"
                  {...formik.getFieldProps('birthdate')}
                />
                {formik.touched.birthdate && formik.errors.birthdate ? (
                  <FormErrorMessage>{formik.errors.birthdate}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.phone && formik.errors.phone !== undefined
                }
              >
                <Input
                  id="phone"
                  bg={inputBg}
                  size="lg"
                  placeholder="Telefone"
                  {...formik.getFieldProps('phone')}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                ) : null}
              </FormControl>
            </SimpleGrid>
          )}
          <ActionButtons
            isLoaded={isLoaded}
            primaryAction={formik.handleSubmit}
            secondaryAction={returnToHome}
          />
        </form>
      )}
      {isLoaded && !client && (
        <Alert status="error">
          <AlertTitle>Este cliente não existe!</AlertTitle>
          <AlertDescription>Verifique o id e tente novamente.</AlertDescription>
        </Alert>
      )}
    </Layout>
  )
}

export default EditClient
