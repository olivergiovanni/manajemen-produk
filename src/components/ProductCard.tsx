import { default as Button } from "antd/lib/button";
import { default as Card } from "antd/lib/card";
import { default as Modal } from "antd/lib/modal"
import { Link } from "react-router-dom";
import { Product } from "../types/Product.interface";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../features/product/productSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteProduct(product.id))
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: "Apakah anda ingin menghapus produk ini?",
      icon: <ExclamationCircleFilled />,
      content: "Produk yang sudah dihapus tidak bisa dikembalikan lagi",
      onOk: handleDelete
    })
  }

  return (
    <Card className="p-2 relative">
      <img className="size-40" src="/images/product.png" />
      <div className="mt-3">{product.name}</div>
      <div>{`Harga: Rp.${product.price.toLocaleString()}`}</div>
      <div>{`Jumlah Stok: ${product.stock}`}</div>

      <div className="mt-2 flex flex-row gap-x-2">
        <Link to={`/product/edit/${product.id}`}>
          <Button icon={<EditOutlined />}/>
        </Link>
        <Button icon={<DeleteOutlined />} onClick={confirmDelete} />
      </div>
    </Card>
  )
}

export default ProductCard
