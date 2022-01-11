import type {AxiosError} from 'axios'
import axios from 'axios'
import type {Magic, QueryResult} from '~/interfaces'

async function getResources<T>(resourceName: string): Promise<QueryResult<T>> {
  try {
    const {data} = await axios.get(`/api/${resourceName}`)
    return data as T
  } catch (e) {
    const err = e as AxiosError
    console.warn(err.message)
    return null
  }
}

export const getMagics = async (): Promise<Array<Magic>> => await getResources<Array<Magic>>('getMagics')
