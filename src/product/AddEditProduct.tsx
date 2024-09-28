import { yupResolver } from "@hookform/resolvers/yup";
import { default as Button } from "antd/lib/button"
import { default as Form } from "antd/lib/form";
import { default as Input } from "antd/lib/input";
import { default as InputNumber } from "antd/lib/input-number";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router";
import { v4 as uuid } from 'uuid'
import { IAddEditProduct, Product } from "../types/Product.interface";
import { addProduct, editProduct } from "../features/product/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import productSchema from "./productSchema";

const AddEditProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const { pathname } = location
  const isEditPage = pathname.includes("/edit")

  const dispatch = useDispatch()
  const { control, formState: { errors }, handleSubmit, reset } = useForm<IAddEditProduct>({
    resolver: yupResolver(productSchema)
  });
  const products: Product[] = useSelector((state: any)  => state.product.products)

  useEffect(() => {
    if (isEditPage) {
      const currentProduct = products.find((product: Product) => product.id === params.id)
      reset(currentProduct)
    }
  }, [isEditPage])

  const onSubmit = (values: IAddEditProduct) => {
    let newProduct = values
    if (isEditPage) {
      dispatch(editProduct(newProduct as Product))
      return navigate("/product")
    }
    if (!isEditPage) {
      newProduct = {
        ...values,
        id: uuid(),
      }
      dispatch(addProduct(newProduct as Product))
      return navigate("/product")
    }
  }

  return (
    <div className="p-10">
      <h4>Tambah Produk</h4>
      <Link to={`/product`}>
        <Button className="mt-5" icon={<ArrowLeftOutlined />}>Kembali</Button>
      </Link>
      <Form className="mt-5 w-full md:w-1/2" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          extra={errors.name?.message}
          hasFeedback={typeof errors.name !== undefined}
          name="name"
          label="Nama"
          required
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input {...field} name="name" placeholder="Nama Produk" />}
          />
        </Form.Item>
        <Form.Item
          extra={errors.price?.message}
          hasFeedback={typeof errors.price !== undefined}
          name="price"
          label="Harga"
          required
        >
          <Controller
            control={control}
            name="price"
            render={({ field }) => <InputNumber className="w-full" {...field} prefix="Rp" min={1} name="price" placeholder="Harga Produk" />}
          />
        </Form.Item>
        <Form.Item
          extra={errors.stock?.message}
          hasFeedback={typeof errors.stock !== undefined}
          name="stock"
          label="Stok"
          required
        >
          <Controller
            control={control}
            name="stock"
            render={({ field }) => <InputNumber className="w-full" {...field} min={0} name="stock" placeholder="Jumlah Stok" />}
          />
        </Form.Item>
        <Button htmlType="submit">Simpan</Button>
      </Form>
    </div>
  )
}

export default AddEditProduct
