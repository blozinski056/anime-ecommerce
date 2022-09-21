import React from "react"

export default function Navbar() {

  return (
    <div className="navbar">
      <img className="menu-icon" src="./images/hamburger-menu-white.png" />
      <img className="shopping-cart" src="./images/shopping-cart-white.png" />

      <h1>WeebSite</h1>

      <input className="search-bar" placeholder="Search"></input>

      <button className="search-icon">
        <img src="./images/search-white-2.png" />
      </button>
    </div>
  )
}