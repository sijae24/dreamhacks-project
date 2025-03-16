import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const scrollToChat = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="hero bg-base text-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Peer to Peer</h1>
          <h1 className="text-5xl font-bold">Chat Room</h1>
          <p className="py-6">
            Do you want to chat with your friends online? Connect with them here.
          </p>
          <button className="btn bg-red-500 hover:bg-red-800" onClick={scrollToChat}>
            Chat Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero