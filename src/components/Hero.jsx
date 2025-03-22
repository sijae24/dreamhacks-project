import React from 'react'
import { Link } from 'react-scroll'

const Hero = () => {

  return (
    <div className="hero text-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Peer to Peer</h1>
          <h1 className="text-4xl font-bold">Chat Room</h1>
          <p className="py-6">
            Do you want to chat with your friends online? Connect with them here.
          </p>
          <button className="btn text-white bg-red-500 hover:bg-red-800" >
            <Link to="chat" smooth duration={500}> 
            Chat Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero