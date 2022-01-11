import query from '~/api/query'
import type { Magic } from '~/interfaces'

const getMagicsQueryStatement = 'SELECT * FROM products'
export const getMagics = async(): Promise<Array<Magic>> => await query<Array<Magic>>(getMagicsQueryStatement)
