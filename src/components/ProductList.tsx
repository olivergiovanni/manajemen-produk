import { default as Empty } from 'antd/lib/empty'
import { Product } from "../types/Product.interface"
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
}

const ProductList = (props: ProductListProps) => {
  const { products } = props
  if (products.length === 0) {
    return <Empty />
  }
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-10 mt-5'>
      {products.map((product: Product, key: number) => <ProductCard key={key} product={product} />)}
    </div>
  )
}

export default ProductList
