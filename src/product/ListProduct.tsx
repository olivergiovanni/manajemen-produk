import { default as Button } from "antd/lib/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { PlusOutlined } from "@ant-design/icons";

const ListProduct = () => {
  const products = useSelector((state: any)  => state.product.products)

  return (
    <div className="p-10">
      <Link to="/product/add">
        <Button icon={<PlusOutlined />}>
          Tambah Produk
        </Button>
      </Link>
      <ProductList products={products} />
    </div>
  )
}

export default ListProduct
