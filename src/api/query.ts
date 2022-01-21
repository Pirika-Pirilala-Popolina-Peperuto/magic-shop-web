import type { AxiosError } from 'axios'
import axios from 'axios'
import type { QueryResult } from '~/interfaces'

const baseURL = 'http://localhost'

export default async function query<T>(sql?: string): Promise<QueryResult<T>> {
  try {
    const { data } = await axios.get('/query', {
      baseURL, params: { ...(sql && { sql }) },
    })
    return data as T
  }
  catch (e) {
    const err = e as AxiosError
    console.warn(err.message)
    return null
  }
}
