import type {IncomingMessage, ServerResponse} from 'http'
import query from '../query'
import type {Magic} from '~/interfaces'

const queryStatement = 'SELECT * FROM products'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const magics = await query<Array<Magic>>(queryStatement)
  if (magics) {
    res.statusCode = 200
    res.end(magics)
    return
  }
  
  res.statusCode = 500
  res.end()
  return
}
