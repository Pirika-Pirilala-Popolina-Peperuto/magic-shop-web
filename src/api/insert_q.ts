import query from '~/api/query'
import type { Magic, Picture, User } from '~/interfaces'
import { v4 as uuidv4 } from 'uuid';

// WARNING: DO NOT DO THESE OPERATIONS IN FRONT-END!
// There are just for fast-speed development, which is not an acceptable choice!

const PostOrders = 'SELECT * FROM products'
export const getMagics = async(): Promise<Array<Magic>> => {
  const data = await query<Array<Magic>>(getMagicsQueryStatement)
  return data as Magic[]
}

`

INSERT INTO orders(id,customer_id,created_at,process_status,remark) 
VALUES ('7dfacba8-050d-40fd-b786-fa5e1130d748','75074e4d-94a2-4053-9b9a-64eea3c4c829','2021/1/11','PROCESS','快一點');
`




