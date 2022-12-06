import axios from 'axios'
import CH from 'src/types'

const localApi = `${process.env.REACT_APP_CLIENTS_API}/clients`

const getClients = (page: number, limit: number) => {
  return axios
    .get(`${localApi}?_page=${page}&_limit=${limit}`)
    .then((response) => response)
    .catch((error) => console.error('getClients', error))
}

const getClient = (clientId: string | undefined) => {
  return axios
    .get(`${localApi}/${clientId}`)
    .then((response) => response)
    .catch((error) => console.error('getClient', error))
}

const postClient = (clientInfo: CH.Client) => {
  return axios
    .post(`${localApi}`, clientInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch((error) => console.error('postClient', error))
}

const updateClient = (clientId: string, clientInfo: CH.Client) => {
  return axios
    .put(`${localApi}/${clientId}`, clientInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch((error) => console.error('updateClient', error))
}

const deleteClient = (clientId: string) => {
  return axios
    .delete(`${localApi}/${clientId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch((error) => console.error('deleteClient', error))
}

const getByName = (name: string) => {
  return axios
    .get(`${localApi}?name_like=${name}`)
    .then((response) => response)
    .catch((error) => console.error('getClients', error))
}

const getByCpf = (cpf: string) => {
  return axios
    .get(`${localApi}?cpf_like=${cpf}`)
    .then((response) => response)
    .catch((error) => console.error('getClients', error))
}

export {
  getClients,
  getClient,
  postClient,
  updateClient,
  deleteClient,
  getByName,
  getByCpf
}
