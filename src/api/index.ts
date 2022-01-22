import internal from 'stream'
import query from '~/api/query'
import type { Magic, Picture, User } from '~/interfaces'
import { v4 as uuidv4 } from 'uuid';

// WARNING: DO NOT DO THESE OPERATIONS IN FRONT-END!
// There are just for fast-speed development, which is not an acceptable choice!

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

export const getUser = async(email: string, p: string): Promise<User | null> => {
  // DO NOT THINK THERE is NO ANY SQL injection !
  const simpleSqlIDetector = /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi
  const hasSimpleSqlI = simpleSqlIDetector.test(email) || simpleSqlIDetector.test(p)
  if (hasSimpleSqlI) return null
  const getUserQueryStatement = `SELECT id, name, email, address FROM users WHERE email = '${email}' AND password = '${p}'`
  const data = (await query<Array<User>>(getUserQueryStatement))![0]
  return data && ((data.email === email) ? data : null)
}

export const isUserExist = async(email: string): Promise<boolean> => {
  // DO NOT THINK THERE is NO ANY SQL injection !
  const simpleSqlIDetector = /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi
  const hasSimpleSqlI = simpleSqlIDetector.test(email)
  if (hasSimpleSqlI) return true // if error, always return true.
  const hasUserQueryStatement = `SELECT EXISTS(SELECT email from users WHERE email = '${email}')`
  const data = (await query<Array<{ exists: boolean }>>(hasUserQueryStatement))![0]
  return data?.exists ?? true // if error, always return true.
}

export const getSpecificMagic = async(magicId: string): Promise<Magic> => {
  const getMagicQueryStatement = `SELECT * FROM products WHERE id='${magicId}'`
  const magic = (await query<Array<Magic>>(getMagicQueryStatement))![0]
  const getPictureQueryStatement = `SELECT * FROM pictures WHERE id='${magic?.picture_id}'`
  const picture = (await query<Array<Picture>>(getPictureQueryStatement))![0]
  magic!.pictureUrl = picture?.picture_url
  return magic as Magic
}

export const addNewUser = async(name: string, address: string, email: string, password: string): Promise<boolean> => {
  const createUserMutationStatement = `INSERT INTO users(name, email, address, password) VALUES('${name}', '${email}', '${address}', '${password}')`
  await query(createUserMutationStatement)
  return true
}

export const addNewOrder = async(customer_id: string, created_at: string, process_status: string, remark: string, quantitly : number,
  product_id : string): Promise<boolean> => {

  for(var i = 1; i <= quantitly; i++){
    const orders_id = uuidv4();
    const createOrder = `INSERT INTO orders(id,customer_id,created_at,process_status,remark) 
    VALUES ('${orders_id}', '${customer_id}', '${created_at}', '${process_status}', '${remark}')`
    await query(createOrder)

    const createProductOrder = `INSERT INTO order_products(order_id,product_id) 
    VALUES('${orders_id}', '${product_id}')    
    `
    await query(createProductOrder)
  }
  return true
}

