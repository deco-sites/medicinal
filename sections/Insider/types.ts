import type { ProductDetailsPage, ProductListingPage } from 'apps/commerce/types.ts'

declare global {
  interface Window {
    insider_object?: {
      page?: {
        type: string
      }
      user?: {
        uuid: string
        gender: string
        name: string
        surname: string
        email: string
        language: string
      }
      product?: InsiderProduct
      listing?: {
        items: InsiderProduct[]
      }
      basket?: {
        currency: string
        total: number
        line_items: {
          product?: InsiderProduct
          subtotal?: number
          quantity?: number
        }[]
      }
    }
  }
}

/**
 * @title Listagem de produtos
 * @default null
 */
export type ListingPage = ProductListingPage | null

/**
 * @title Detalhes de um produto
 * @default null
 */
export type ProductDetails = ProductDetailsPage | null

export type CurrentPageType = {
  /**
   * @title Tipo da página personalizado
   */
  '@type': 'Home' | 'Content'
}

export interface InsiderTrackingSectionProps {
  /**
   * @title Configurações Insider - Página atual
   */
  currentPage?: null | CurrentPageType | ListingPage | ProductDetails
}

export interface InsiderProduct {
  id: string
  name?: string
  taxonomy?: string[]
  currency?: string
  unit_price?: number
  unit_sale_price: number
  url?: string
  stock?: number
  product_image_url?: string
}

export interface UserAPI {
  birthDate: string | null
  email: string
  firstName: string | null
  lastName: string | null
  gender: string
  id: string
  gdpr_optin: boolean | null
  isNewsletterOptIn?: boolean | null
  homePhone?: string | null
  whatsappOptIn?: boolean | null
}

export interface User {
  uuid: string
  gender: string
  name: string
  surname: string
  email: string
  language: string
}

export interface InsiderTrackingProps {
  pageType: 'Product'
  data: InsiderProduct
}
