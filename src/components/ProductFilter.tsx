import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { default as Button } from "antd/lib/button";
import { default as Form } from "antd/lib/form";
import { default as Input } from "antd/lib/input";
import { default as Select } from "antd/lib/select";
import { default as Space } from "antd/lib/space";
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom";

interface IProductFilter {
  name?: string;
  orderBy?: string;
  sortBy?: string;
}

const ProductFilter = (props: any) => {
  const { products, setFilteredProducts } = props
  const { control, handleSubmit } = useForm();

  const orderByOptions = [
    {
      label: "Harga",
      value: "price"
    },
    {
      label: "Stok",
      value: "stock"
    }
  ]

  const sortByOptions = [
    {
      label: "Menaik",
      value: "ascending"
    },
    {
      label: "Menurun",
      value: "descending"
    }
  ]

  const onSearch = (values: IProductFilter) => {
    let newProducts = products
    if (values.name) {
      newProducts = newProducts.filter((product: any) => product.name.includes(values.name))
    }
    if (values.orderBy && values.sortBy == "ascending") {
      newProducts = newProducts.sort((a: any,b: any) => a[`${values.orderBy}`]>b[`${values.orderBy}`])
    }
    if (values.orderBy && values.sortBy == "descending") {
      newProducts = newProducts.sort((a: any,b: any) => a[`${values.orderBy}`]<b[`${values.orderBy}`])
    }
    setFilteredProducts(newProducts)
  }

  return (
    <Form className="w-full lg:w-3/4" layout="vertical" onFinish={handleSubmit(onSearch)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
        <Form.Item
          name="name"
          label="Nama"
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input {...field} name="name" />}
          />
        </Form.Item>
        <Form.Item
          name="orderBy"
          label="Urutkan berdasarkan"
        >
          <Controller
            control={control}
            name="orderBy"
            render={({ field }) => <Select {...field} allowClear={false} options={orderByOptions} />}
          />
        </Form.Item>
        <Form.Item
          name="sortBy"
          label="Urutkan"
        >
          <Controller
            control={control}
            name="sortBy"
            render={({ field }) => <Select {...field} allowClear={false} options={sortByOptions} />}
          />
        </Form.Item>
      </div>
      <Space>
        <Button htmlType="submit" icon={<SearchOutlined />}>Cari</Button>
        <Link to="/product/add">
          <Button icon={<PlusOutlined />}>
            Tambah Produk
          </Button>
      </Link>
      </Space>
    </Form>
  )
}

export default ProductFilter
