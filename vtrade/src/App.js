import "./App.css";
import Categories from "./Components/Categories";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgotPasswordConfirm from "./Components/ForgotPassword/ForgotPasswordConfirm";
import ForgotPasswordEmail from "./Components/ForgotPassword/ForgotPasswordEmail";
import NewPost from "./Components/NewPost";
import NotFound from "./Components/NotFound";
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import apiClient from "./Services/apiClient";
import Box from '@mui/material/Box';
import PostOffer from "./Components/PostOffer";
import PostRequest from "./Components/PostRequest";



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

  const loader = () => {
    return (
      <Box sx={{display : "flex"}}>
       
        <CircularProgress color="inherit" sx={{position: "fixed", top: "50%", left: "50%", transform: "transalte(-50%, -50%)"}} />  
        

      </Box>
    )
  }
  return (
    <div>
   
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} loader={loader}/>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/post" element={<NewPost user={user} setUser={setUser}  />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} loader={loader}/> } />
          <Route path="/register" element={<Register user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}  loader={loader}/>} />
          <Route path="/passwordemail" element={<ForgotPasswordEmail />} />
          <Route path="/passwordconfirm" element={<ForgotPasswordConfirm />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/post/offer" element={<PostOffer user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} loader={loader}/>} />
          <Route path="/post/request" element={<PostRequest user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
