import React from "react"

export default function Navbar({setShowHomePage, setSearchOn, searchedTiles}) {
  const [showAnime, setShowAnime] = React.useState(false);
  const [showMerch, setShowMerch] = React.useState(false);

  // Used when user inputs words in search bar
  function searchKeyword(event) {
    event.preventDefault();

    const keyword = document.querySelector(".search-bar").value.toUpperCase();
    searchedTiles(keyword);
    setSearchOn(true);
  }

  // Used when user clicks on drop down item
  function searchCategory(category) {
    const keyword = category.toUpperCase();
    searchedTiles(keyword);
    setSearchOn(true);
  }

  // Used when user clicks on website logo
  function home() {
    // TRANSITION TO HOME PAGE
    setSearchOn(false);
    setShowHomePage(true);
  }

  // Used when user clicks on Shop All
  function shopAll() {
    setSearchOn(true);
    searchedTiles("");
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
          <li><a onClick={shopAll}>SHOP ALL</a></li>

          {/* Shop by anime */}
          <li className="anime-dropdown" onMouseLeave={() => setShowAnime(false)}>
            <a onMouseOver={() => setShowAnime(true)}>ANIME</a>
            {showAnime &&
              <div className="dropdown-list">
                <ul>
                  <li onClick={() => searchCategory("Attack on Titan")}>Attack on Titan</li>
                  <li onClick={() => searchCategory("Cowboy Bebop")}>Cowboy Bebop</li>
                  <li onClick={() => searchCategory("Demon Slayer")}>Demon Slayer</li>
                  <li onClick={() => searchCategory("Dragon Ball")}>Dragon Ball</li>
                  <li onClick={() => searchCategory("Fullmetal Alchemist")}>Fullmetal Alchemist</li>
                  <li onClick={() => searchCategory("Hunter x Hunter")}>Hunter x Hunter</li>
                  <li onClick={() => searchCategory("Jujutsu Kaisen")}>Jujutsu Kaisen</li>
                  <li onClick={() => searchCategory("My Hero Academia")}>My Hero Academia</li>
                  <li onClick={() => searchCategory("Naruto")}>Naruto</li>
                  <li onClick={() => searchCategory("One Piece")}>One Piece</li>
                  <li onClick={() => searchCategory("Pokemon")}>Pokemon</li>
                  <li onClick={() => searchCategory("Studio Ghibli")}>Studio Ghibli</li>
                  <li onClick={() => searchCategory("Other Anime")}>(Other)</li>
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
                  <li onClick={() => searchCategory("Crewneck")}>Crewnecks</li>
                  <li onClick={() => searchCategory("Figurine")}>Figurines</li>
                  <li onClick={() => searchCategory("Hoodie")}>Hoodies</li>
                  <li onClick={() => searchCategory("Poster")}>Posters</li>
                  <li onClick={() => searchCategory("Shirt")}>Shirts</li>
                  <li onClick={() => searchCategory("Ugly Christmas Sweater")}>Ugly Christmas Sweaters</li>
                  <li onClick={() => searchCategory("Other Merch")}>(Other)</li>
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