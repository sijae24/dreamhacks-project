import React from "react";
import Hero from "./components/Hero";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div> 
      <Navbar />
      <Hero />
      <Chat />
    </div>
  );
};

export default App;
