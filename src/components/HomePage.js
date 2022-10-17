import React from "react"

export default function HomePage({openSearch, filterTiles, setKeyword, setCategory}) {
  const [showAnime, setShowAnime] = React.useState(false);
  const [showMerch, setShowMerch] = React.useState(false);

  // Used when user inputs words in search bar
  function searchKeyword(event) {
    event.preventDefault();
    const word = document.querySelector(".search-bar").value.toUpperCase();
    filterTiles(word, [], [], []);
    setKeyword(word);
    setCategory("");
    openSearch();
  }

  // Used when user clicks on drop down item
  function searchCategory(name, category) {
    const word = name.toUpperCase();
    category === "anime" ? filterTiles("", [word], [], []) : filterTiles("", [], [word], []);
    setKeyword("");
    setCategory(word);
    openSearch();
  }

  // Used when Shop All is clicked
  function shopAll() {
    filterTiles("", [], [], []);
    setKeyword("");
    setCategory("");
    openSearch();
  }

  return (
    <div className="homepage">
      {/* Container for components */}
      <div>
        {/* TITLE */}
        <h1>WeebSite</h1>
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
                  <li onClick={() => searchCategory("Attack on Titan", "anime")}>Attack on Titan</li>
                  <li onClick={() => searchCategory("Cowboy Bebop", "anime")}>Cowboy Bebop</li>
                  <li onClick={() => searchCategory("Demon Slayer", "anime")}>Demon Slayer</li>
                  <li onClick={() => searchCategory("Dragon Ball", "anime")}>Dragon Ball</li>
                  <li onClick={() => searchCategory("Fullmetal Alchemist", "anime")}>Fullmetal Alchemist</li>
                  <li onClick={() => searchCategory("Hunter x Hunter", "anime")}>Hunter x Hunter</li>
                  <li onClick={() => searchCategory("Jujutsu Kaisen", "anime")}>Jujutsu Kaisen</li>
                  <li onClick={() => searchCategory("My Hero Academia", "anime")}>My Hero Academia</li>
                  <li onClick={() => searchCategory("Naruto", "anime")}>Naruto</li>
                  <li onClick={() => searchCategory("One Piece", "anime")}>One Piece</li>
                  <li onClick={() => searchCategory("Pokemon", "anime")}>Pokemon</li>
                  <li onClick={() => searchCategory("Studio Ghibli", "anime")}>Studio Ghibli</li>
                  <li onClick={() => searchCategory("Other Anime", "anime")}>(Other)</li>
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
                  <li onClick={() => searchCategory("Crewneck", "merch")}>Crewnecks</li>
                  <li onClick={() => searchCategory("Figurine", "merch")}>Figurines</li>
                  <li onClick={() => searchCategory("Hoodie", "merch")}>Hoodies</li>
                  <li onClick={() => searchCategory("Poster", "merch")}>Posters</li>
                  <li onClick={() => searchCategory("Shirt", "merch")}>Shirts</li>
                  <li onClick={() => searchCategory("Ugly Christmas Sweater", "merch")}>Ugly Christmas Sweaters</li>
                  <li onClick={() => searchCategory("Other Merch", "merch")}>(Other)</li>
                </ul>
              </div>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}