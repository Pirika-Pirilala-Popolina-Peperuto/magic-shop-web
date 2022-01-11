export type QueryResult<T> = T | null

export interface Magic {
  id: string
  name: string
  description: string
  price: number
  picture_id: string
  pictureUrl?: string
  quantity: number
}

export interface Picture {
  id: string
  picture_url: string
}
