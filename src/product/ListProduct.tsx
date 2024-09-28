import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import ProductFilter from "../components/ProductFilter";
import { useState } from "react";

const ListProduct = () => {
  const products = useSelector((state: any)  => state.product.products)
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <div className="p-10">
      <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default ListProduct
