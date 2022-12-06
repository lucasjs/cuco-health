import React from 'react'
import {
  Input,
  SimpleGrid,
  useToast,
  FormControl,
  useColorModeValue,
  FormErrorMessage
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { postClient } from 'src/api'
import { customAlphabet } from 'nanoid'
import FormSkeleton from 'src/components/FormSkeleton'
import ActionButtons from 'src/containers/ActionsButtons'
import returnName from 'src/helpers/returnName'
import Layout from 'src/containers/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const NewClient = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const nanoid = customAlphabet('1234567890abcdef', 7)
  const toast = useToast()
  const navigate = useNavigate()

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  const returnToHome = () => {
    navigate('/')
  }

  const formik = useFormik({
    initialValues: {
      id: nanoid(),
      name: '',
      cpf: '',
      birthdate: '',
      phone: ''
    },
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
    onSubmit: async (values) => {
      if (values) {
        const response = await postClient(values)

        if (response?.status === 201) {
          toast({
            title: `Usuário ${returnName(values.name)} criado com sucesso.`,
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

  const inputBg = useColorModeValue('white', 'gray.800')

  return (
    <Layout title="Novo cliente">
      {!isLoaded && <FormSkeleton quantity={4} />}
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
              isInvalid={formik.touched.cpf && formik.errors.cpf !== undefined}
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
    </Layout>
  )
}

export default NewClient
