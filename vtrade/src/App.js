import "./App.css";
import Categories from "./Components/Categories";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import postOffer from "./Components/PostOffer";
import postDetails from "./Components/PostDetails";
import postWant from "./Components/PostWant";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgotPasswordConfirm from "./Components/ForgotPassword/ForgotPasswordConfirm";
import ForgotPasswordEmail from "./Components/ForgotPassword/ForgotPasswordEmail";
import NotFound from "./Components/NotFound";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/listing/:id" element={<postDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordemail" element={<ForgotPasswordEmail />} />
          <Route path="/passwordconfirm" element={<ForgotPasswordConfirm />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
