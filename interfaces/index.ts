export interface ProductImage {
  altText: string
  originalSrc: string
}

export interface CartItem {
  variantId: number
  productImage: ProductImage
  productTitle: string
  variantTitle: string
  variantQuantity: number
  variantPrice: number
}
