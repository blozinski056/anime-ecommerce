import React from "react"

export default function Navbar({setShowHomePage, setSearchOn, setKeyword}) {
  const [showAnime, setShowAnime] = React.useState(false);
  const [showMerch, setShowMerch] = React.useState(false);

  function searchKeyword(event) {
    event.preventDefault();

    const keyword = document.querySelector(".search-bar").value.toUpperCase();
    setKeyword(keyword);
    setSearchOn(true);
  }

  function home() {
    // TRANSITION TO HOME PAGE
    setSearchOn(false);
    setShowHomePage(true);
  }

  function searchAll() {
    setSearchOn(true);
    setKeyword("");
  }

  return (
    <div className="navbar">
      {/* TITLE */}
      <h1 onClick={home}>WeebSite</h1>

      {/* SEARCH BAR */}
      <form onSubmit={searchKeyword}>
        <input className="search-bar" placeholder="Search" />

        <button className="search-icon" type="submit">
          <img src="./images/search-white-2.png" />
        </button>
      </form>

      {/* BUTTONS */}
      <ul>
          {/* Shop all items */}
          <li><a onClick={searchAll}>SHOP ALL</a></li>

          {/* Shop by anime */}
          <li className="anime-dropdown" onMouseLeave={() => setShowAnime(false)}>
            <a onMouseOver={() => setShowAnime(true)}>ANIME</a>
            {showAnime &&
              <div className="dropdown-list">
                <ul>
                  <li>Attack on Titan</li>
                  <li>Cowboy Bebop</li>
                  <li>Demon Slayer</li>
                  <li>Dragon Ball</li>
                  <li>Fullmetal Alchemist</li>
                  <li>Hunter x Hunter</li>
                  <li>Jujutsu Kaisen</li>
                  <li>My Hero Academia</li>
                  <li>Naruto</li>
                  <li>One Piece</li>
                  <li>Pokemon</li>
                  <li>Studio Ghibli</li>
                  <li>(Other)</li>
                </ul>
              </div>
            }
          </li>

          {/* Shop by type of merchandise */}
          <li className="merch-dropdown" onMouseLeave={() => setShowMerch(false)}>
            <a onMouseOver={() => setShowMerch(true)}>MERCHANDISE</a>
            {showMerch &&
              <div className="dropdown-list">
                <ul>
                  <li>Hoodies/Sweatshirts</li>
                  <li>Posters</li>
                  <li>Shirts</li>
                  <li>(Other)</li>
                </ul>
              </div>
            }
          </li>
        </ul>

      {/* SHOPPING CART */}
      <img className="shopping-cart" src="./images/shopping-cart-white.png" />
    </div>
  )
}