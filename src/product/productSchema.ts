import * as yup from "yup";

const productSchema = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required(),
})

export default productSchema
