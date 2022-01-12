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

export const getSpecificMagic = async(magicId: string): Promise<Magic> => {
  const getMagicQueryStatement = `SELECT * FROM products WHERE id='${magicId}'`
  const magic = (await query<Array<Magic>>(getMagicQueryStatement))![0]
  const getPictureQueryStatement = `SELECT * FROM pictures WHERE id='${magic?.picture_id}'`
  const picture = (await query<Array<Picture>>(getPictureQueryStatement))![0]
  magic!.pictureUrl = picture?.picture_url
  return magic as Magic
}
