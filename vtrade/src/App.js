import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgotPasswordConfirm from "./Components/ForgotPassword/ForgotPasswordConfirm";
import ForgotPasswordEmail from "./Components/ForgotPassword/ForgotPasswordEmail";
import NewPost from "./Components/NewPost";
import NotFound from "./Components/NotFound";
import { useState, useEffect } from "react";
import apiClient from "./Services/apiClient";
import PostOffer from "./Components/PostOffer";
import PostRequest from "./Components/PostRequest";
import HomePage from "./Components/HomePage";
import ProductCard from "./Components/ProductCard";
import { Loader } from "./Components/Loader";
import Breadcrumbs from "./Components/Breadcrumbs";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();

      if (data) {
        setUser(data.user);
      }
      if (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    const token = localStorage.getItem("vtrade_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar
          user={user}
          setUser={setUser}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          Loader={Loader}
        />
        <Breadcrumbs />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                setUser={setUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                Loader={Loader}
              />
            }
          />
          <Route
            path="/post"
            element={<NewPost user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={
              <Login
                user={user}
                setUser={setUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                Loader={Loader}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                user={user}
                setUser={setUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                Loader={Loader}
              />
            }
          />
          <Route path="/passwordemail" element={<ForgotPasswordEmail />} />
          <Route path="/passwordconfirm" element={<ForgotPasswordConfirm />} />
          <Route path="/post/:id" element={<ProductCard />} />
          <Route path="/*" element={<NotFound />} />
          <Route
            path="/post/offer"
            element={
              <PostOffer
                user={user}
                setUser={setUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                Loader={Loader}
              />
            }
          />
          <Route
            path="/post/request"
            element={<PostRequest user={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
