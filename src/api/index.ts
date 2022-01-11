import query from '~/api/query'
import type { Magic, Picture } from '~/interfaces'

const getMagicsQueryStatement = 'SELECT * FROM products'
export const getMagics = async(): Promise<Array<Magic>> => {
  const data = await query<Array<Magic>>(getMagicsQueryStatement)
  return data as Magic[]
}

const getAllPicturesQueryStatement = 'SELECT * FROM pictures'
export const getPictures = async(): Promise<Array<Picture>> => {
  const data = await query<Array<Picture>>(getAllPicturesQueryStatement)
  return data as Picture[]
}
