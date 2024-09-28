import { default as Button } from "antd/lib/button"
import { default as Form } from "antd/lib/form";
import { default as Input } from "antd/lib/input";
import { default as InputNumber } from "antd/lib/input-number";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { v4 as uuid } from 'uuid'
import { IAddEditProduct, Product } from "../types/Product.interface";
import { addProduct } from "../features/product/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const AddEditProduct = () => {
  const location = useLocation()
  const params = useParams()
  const { pathname } = location
  const isEditPage = pathname.includes("/edit")

  // type FormType = isAddPage ? AddProduct | EditProduct

  const dispatch = useDispatch()
  const { control, handleSubmit, reset } = useForm<IAddEditProduct>();
  const products: Product[] = useSelector((state: any)  => state.product.products)

  useEffect(() => {
    if (isEditPage) {
      const currentProduct = products.find((product: Product) => product.id === params.id)
      reset(currentProduct)
    }
  }, [isEditPage])

  const onSubmit = (values: IAddEditProduct) => {
    const newProduct = {
      ...values,
      id: uuid(),
    }
    dispatch(addProduct(newProduct))
  }

  return (
    <div className="p-10">
      <h4>Tambah Produk</h4>
      <Link to={`/product`}>
        <Button className="mt-5" icon={<ArrowLeftOutlined />}>Kembali</Button>
      </Link>
      <Form className="mt-5 w-full md:w-1/2" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          name="name"
          label="Nama"
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input {...field} name="name" placeholder="Nama Produk" />}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Harga"
        >
          <Controller
            control={control}
            name="price"
            render={({ field }) => <InputNumber className="w-full" {...field} prefix="Rp" name="price" placeholder="Harga Produk" />}
          />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stok"
        >
          <Controller
            control={control}
            name="stock"
            render={({ field }) => <InputNumber className="w-full" {...field} name="stock" placeholder="Jumlah Stok" />}
          />
        </Form.Item>
        <Button htmlType="submit">Simpan</Button>
      </Form>
    </div>
  )
}

export default AddEditProduct
