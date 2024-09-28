import { Route, Routes } from "react-router";
import AddEditProduct from "./product/AddEditProduct";
import ListProduct from "./product/ListProduct";

const Router = () => {
  return (
    <Routes>
      <Route element={<ListProduct />} path="/product"/>
      <Route element={<AddEditProduct />} path="/product/add"/>
      <Route element={<AddEditProduct />} path="/product/edit/:id"/>
    </Routes>
  )
}

export default Router
