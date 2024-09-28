import { BrowserRouter , Navigate, Route, Routes } from "react-router-dom";
import AddEditProduct from "./product/AddEditProduct";
import ListProduct from "./product/ListProduct";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ListProduct />} path="/product"/>
        <Route element={<AddEditProduct />} path="/product/add"/>
        <Route element={<AddEditProduct />} path="/product/edit/:id"/>
        <Route element={<Navigate replace to='/product' />} path='*' />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
