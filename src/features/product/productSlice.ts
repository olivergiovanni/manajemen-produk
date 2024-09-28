import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.interface";
import { ProductState } from "./ProductState.interface";

const initialState: ProductState = {
  products: []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state: ProductState, action: PayloadAction<Product>) =>
      ({ products: [...state.products, action.payload] }),
    deleteProduct: (state: ProductState, action: PayloadAction<string>) =>
      ({ products: current(state.products).filter((product: Product) => product.id !== action.payload) }),
  },
})

export const { addProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer
