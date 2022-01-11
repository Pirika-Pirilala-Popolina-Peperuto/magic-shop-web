export type QueryResult<T> = T | null

export interface Magic {
  id: string
  name: string
  description: string
  price: number
  pictureUrl: string
  pictureId: string
  quantity: number
}
