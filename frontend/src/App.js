import "./App.css";
import Dashboard from "./admin/pages/Dashboard";
import Product from "./admin/pages/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./front/NotFound";
import Order from "./admin/pages/Order";
import Category from "./admin/pages/Category";
import Home from "./front/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/orders" element={<Order />} />
          <Route path="/admin/categories" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
