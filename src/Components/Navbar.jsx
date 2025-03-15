import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed navbar bg-base-100 shadow-sm">
      <a className="btn btn-ghost text-xl"><Link to="/">P2PChat</Link></a>
    </div>
  );
};

export default Navbar;
