import React from "react"

export default function Navbar({setShowHomePage, setFiltersOn, setKeyword}) {
  function searchKeyword(event) {
    event.preventDefault();

    const keyword = document.querySelector(".search-bar");
    setFiltersOn(true);
    setKeyword(keyword);
  }

  function home() {
    // TRANSITION TO HOME PAGE
    setFiltersOn(false);
    setShowHomePage(true);
  }

  return (
    <div className="navbar">
      <h1 onClick={home}>WeebSite</h1>

      <form onSubmit={searchKeyword}>
        <input className="search-bar" placeholder="Search" />

        <button className="search-icon" type="submit">
          <img src="./images/search-white-2.png" />
        </button>
      </form>

      <ul>
        <li><a>SHOP ALL</a></li>
        <li><a>ANIME</a></li>
        <li><a>MERCHANDISE</a></li>
      </ul>

      <img className="shopping-cart" src="./images/shopping-cart-white.png" />
    </div>
  )
}