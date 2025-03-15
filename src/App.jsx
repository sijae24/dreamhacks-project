
import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Chatbot from "./Components/Chatbot";
const App = () => {
  const routes = [
    { path: "/", element: <Hero /> },
    { path: "/chat", element: <Chatbot /> }
  ];  

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes> 
      </Router>
    </div>
  );
};

export default App;
