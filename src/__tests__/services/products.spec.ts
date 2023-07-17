import { vi, describe, it, afterEach } from 'vitest'
import ProductsApi from '@/services/products'

const SKU_VALUE = 1073119

const mockFetchProducts = vi.spyOn(ProductsApi, 'fetchProducts')
const mockFetchProductsOnlyOnSale = vi.spyOn(ProductsApi, 'fetchProductsOnlyOnSale')
const mockFetchDetailedProduct = vi.spyOn(ProductsApi, 'fetchDetailedProduct')

const mockedProductsData = {
  from: 1,
  to: 10,
  currentPage: 1,
  total: 154025,
  totalPages: 15403,
  queryTime: '0.021',
  totalTime: '0.028',
  partial: false,
  canonicalUrl:
    '/v1/products?show=sku,name,salePrice,image,startDate,onSale&sort=name&pageSize=10&format=json&apiKey=VEu4DRF1Wwgl54oI4TerpOTq',
  products: [
    {
      sku: 34745739,
      name: '! [LP] - VINYL',
      salePrice: 25.99,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3474/34745739_sa.jpg',
      startDate: '2019-04-12',
      onSale: false
    },
    {
      sku: 6174522,
      name: '"Awaken, My Love!" [LP] - VINYL',
      salePrice: 25.99,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6174/6174522_sa.jpg',
      startDate: '2017-04-14',
      onSale: false
    },
    {
      sku: 35677472,
      name: '"Caught in the dilemma of being made to choose" This makes the modesty which should never been closed off itself Continue to ask itself: "Ready or Not?" [LP] - VINYL',
      salePrice: 47.99,
      image:
        'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/a3bc97fd-466d-485c-8724-36f7d9e5f470.jpg',
      startDate: '2022-04-01',
      onSale: false
    },
    {
      sku: 18304234,
      name: '"Ruth" [LP] - VINYL',
      salePrice: 29.99,
      image:
        'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/7860ccb1-cebb-44b5-a2f8-f3a91ef7febb.jpg',
      startDate: '2015-08-14',
      onSale: false
    },
    {
      sku: 6138887,
      name: '"Weird Al" Yankovic: The Ultimate Video Collection [DVD] [2003]',
      salePrice: 11.99,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6138/6138887_sa.jpg',
      startDate: '2003-04-08',
      onSale: false
    },
    {
      sku: 34700003,
      name: '#1 Record [LP] - VINYL',
      salePrice: 29.99,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3470/34700003_sa.jpg',
      startDate: '2019-06-28',
      onSale: false
    },
    {
      sku: 30561171,
      name: '#3 [LP] - VINYL',
      salePrice: 23.99,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3056/30561171_sa.jpg',
      startDate: '2015-08-28',
      onSale: false
    },
    {
      sku: 35598561,
      name: '#7DJ (7 Días en Jamaica) [LP] - VINYL',
      salePrice: 19.99,
      image:
        'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/8df6d487-efce-4e1d-9047-23ef00048093.jpg',
      startDate: '2022-05-20',
      onSale: false
    },
    {
      sku: 35053157,
      name: '#Acousticnow [LP] - VINYL',
      salePrice: 29.99,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3505/35053157_sa.jpg',
      startDate: '2020-06-26',
      onSale: false
    },
    {
      sku: 35371615,
      name: '#Blessed [DVD]',
      salePrice: 16.99,
      image: null,
      startDate: '2021-02-09',
      onSale: false
    }
  ]
}

const mockedProductsOnSaleData = {
  from: 1,
  to: 5,
  currentPage: 1,
  total: 17721,
  totalPages: 3545,
  queryTime: '0.014',
  totalTime: '0.024',
  partial: false,
  canonicalUrl:
    '/v1/products(onSale=true)?show=sku,name,salePrice,image,startDate,onSale&pageSize=5&format=json&apiKey=VEu4DRF1Wwgl54oI4TerpOTq',
  products: [
    {
      sku: 1053557,
      name: 'Logitech - K120  Full-size Wired Membrane Keyboard for PC with Spill-Resistant Design - Black',
      salePrice: 13.49,
      image: 'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1053/1053557cv11d.jpg',
      startDate: '2016-11-11',
      onSale: true
    },
    {
      sku: 1073004,
      name: 'Whirlpool - 18.2 Cu. Ft. Top-Freezer Refrigerator - Monochromatic Stainless Steel',
      salePrice: 729.99,
      image: 'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1073/1073004_sa.jpg',
      startDate: '2014-11-13',
      onSale: true
    },
    {
      sku: 1073095,
      name: 'Whirlpool - 18.2 Cu. Ft. Top-Freezer Refrigerator - White',
      salePrice: 679.99,
      image: 'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1073/1073095_sd.jpg',
      startDate: '2014-11-13',
      onSale: true
    },
    {
      sku: 1073119,
      name: 'Whirlpool - 18.2 Cu. Ft. Top-Freezer Refrigerator - Black',
      salePrice: 679.99,
      image: 'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1073/1073119_sd.jpg',
      startDate: '2014-11-13',
      onSale: true
    },
    {
      sku: 1073155,
      name: 'Whirlpool - 14.3 Cu. Ft. Top-Freezer Refrigerator - Black',
      salePrice: 599.99,
      image: 'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1073/1073155_sa.jpg',
      startDate: '2014-11-13',
      onSale: true
    }
  ]
}

const mockedProductDetailedData = {
  from: 1,
  to: 1,
  currentPage: 1,
  total: 1,
  totalPages: 1,
  queryTime: '0.051',
  totalTime: '0.055',
  partial: false,
  canonicalUrl:
    '/v1/products(sku=1073119)?show=name,genre,longDescription,sku,salePrice,startDate,image,shippingLevelsOfService&format=json&apiKey=VEu4DRF1Wwgl54oI4TerpOTq',
  products: [
    {
      name: 'Whirlpool - 18.2 Cu. Ft. Top-Freezer Refrigerator - Black',
      genre: null,
      longDescription:
        'With wall-to-wall frameless glass shelves, humidity-controlled crispers, a Flexi-Slide bin and gallon-size door storage, this 18.2 cu. ft. Whirlpool WRT318FZDB top-freezer refrigerator provides plenty of room to house your groceries.',
      sku: 1073119,
      salePrice: 679.99,
      startDate: '2014-11-13',
      image: 'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1073/1073119_sd.jpg',
      shippingLevelsOfService: [],
      onSale: true
    }
  ]
}

describe('Products API Service', () => {
  afterEach(() => {
    mockFetchProducts.mockReset()
    mockFetchProductsOnlyOnSale.mockReset()
    mockFetchDetailedProduct.mockReset()
  })

  it('should fetch products', async () => {
    mockFetchProducts.mockResolvedValue(mockedProductsData)

    const response = await ProductsApi.fetchProducts({ pageSize: 10, page: 1 })

    expect(mockFetchProducts).toHaveBeenCalled()
    expect(response).toEqual(mockedProductsData)
  })

  it('should fetch products only on sale', async () => {
    mockFetchProductsOnlyOnSale.mockResolvedValue(mockedProductsOnSaleData)

    const response = await ProductsApi.fetchProductsOnlyOnSale()

    expect(mockFetchProductsOnlyOnSale).toHaveBeenCalled()
    expect(response).toEqual(mockedProductsOnSaleData)
  })

  it('should fetch detailed product', async () => {
    mockFetchDetailedProduct.mockResolvedValue(mockedProductDetailedData)

    const response = await ProductsApi.fetchDetailedProduct(SKU_VALUE)

    expect(mockFetchDetailedProduct).toHaveBeenCalled()
    expect(response).toEqual(mockedProductDetailedData)
  })
})
