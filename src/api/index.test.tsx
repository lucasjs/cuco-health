import axios from 'axios'

import { getClients, getClient, postClient } from '../api'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedUsers = [
  {
    id: 'def123',
    name: 'João Pereira',
    cpf: '456.789.123-47',
    birthdate: '1990-11-09',
    phone: '(12) 9999-9999'
  },
  {
    id: 'abc456',
    name: 'Maria Silva',
    cpf: '123.456.789-99',
    birthdate: '1995-06-15',
    phone: '(11) 9999-3198'
  }
]

describe('API', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear()
    mockedAxios.post.mockClear()
  })

  describe('getClients', () => {
    test('should return 2 clients', async () => {
      const users = {
        data: mockedUsers,
        status: 200,
        headers: {
          'x-total-count': '2'
        }
      }
      const page = 1
      const limit = 5

      mockedAxios.get.mockResolvedValueOnce(users)

      expect(axios.get).not.toHaveBeenCalled()
      const service = await getClients(page, limit)
      expect(axios.get).toHaveBeenCalled()
      expect(service).toEqual(users)
    })
  })

  describe('getClient', () => {
    test('should return client by Id', async () => {
      const user = {
        data: mockedUsers[0],
        status: 200
      }
      const userId = mockedUsers[0].id

      mockedAxios.get.mockResolvedValueOnce(user)

      expect(axios.get).not.toHaveBeenCalled()
      const service = await getClient(userId)
      expect(axios.get).toHaveBeenCalled()
      expect(service).toEqual(user)
    })

    test('should return empty when client Id is wrong', async () => {
      const notFoundUser = {
        data: {},
        status: 404
      }
      const wrongUserId = '123'

      mockedAxios.get.mockResolvedValueOnce(notFoundUser)

      expect(axios.get).not.toHaveBeenCalled()
      const service = await getClient(wrongUserId)
      expect(axios.get).toHaveBeenCalled()
      expect(service).toEqual(notFoundUser)
    })
  })

  describe('postClient', () => {
    test('should register new client', async () => {
      const newUser = {
        id: '123bca',
        name: 'José Pereira',
        cpf: '321.789.123-47',
        birthdate: '1972-03-05',
        phone: '(14) 9999-9999'
      }

      mockedAxios.post.mockResolvedValueOnce(newUser)

      expect(axios.post).not.toHaveBeenCalled()
      const service = await postClient(newUser)
      expect(axios.post).toHaveBeenCalled()
      expect(service).toEqual(newUser)
    })
  })
})
