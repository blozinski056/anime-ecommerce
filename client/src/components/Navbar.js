import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Navbar({ cart, setClickToggle }) {
  const [showAnime, setShowAnime] = React.useState(false);
  const [showMerch, setShowMerch] = React.useState(false);
  const navigate = useNavigate();

  function search(event) {
    event.preventDefault();
    // search word will be lower case
    const word = document.querySelector(".search-bar").value.toLowerCase();
    navigate(`/items/search/${word}`);
  }

  function shopAll() {
    // setClickToggle((prevClickToggle) => !prevClickToggle);
    setClickToggle((prevClickToggle) => {
      console.log(prevClickToggle);
      return !prevClickToggle;
    });
    document.querySelector(".search-bar").value = "";
    document.querySelector(".min-price") &&
      (document.querySelector(".min-price").value = "");
    document.querySelector(".max-price") &&
      (document.querySelector(".max-price").value = "");
    navigate("/items/search");
  }

  function searchCategory(categoryWord, group) {
    // category word will be upper case
    const word = "".concat(group.toUpperCase(), categoryWord.toUpperCase());
    console.log("click");

    setClickToggle((prevClickToggle) => {
      console.log(prevClickToggle);
      return !prevClickToggle;
    });
    document.querySelector(".search-bar").value = "";
    document.querySelector(".min-price") &&
      (document.querySelector(".min-price").value = "");
    document.querySelector(".max-price") &&
      (document.querySelector(".max-price").value = "");
    navigate(`/items/search/${word}`);
  }

  // Counts total to display next to cart icon
  function cartTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }

  return (
    <>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>EinSite</h1>
        <form className="search-form" onSubmit={search}>
          <input
            className="search-bar"
            placeholder="Search"
            type="text"
            // defaultValue={
            //   document.querySelector(".search-bar.home")
            //     ? document.querySelector(".search-bar.home").value
            //     : ""
            // }
          />
          <button className="search-icon" type="submit">
            <img src="/images/search-white-2.png" alt="" />
          </button>
        </form>
        <ul className="tabs">
          <li className="shop-all" onClick={() => shopAll()}>
            <button>SHOP ALL</button>
          </li>
          <li
            className="anime-dropdown"
            onMouseOver={() => setShowAnime(true)}
            onMouseLeave={() => setShowAnime(false)}
          >
            <button>ANIME</button>
            {showAnime && (
              <div className="dropdown-list">
                <ul>
                  <li
                    onClick={() => searchCategory("Attack on Titan", "anime")}
                  >
                    Attack on Titan
                  </li>
                  <li onClick={() => searchCategory("Cowboy Bebop", "anime")}>
                    Cowboy Bebop
                  </li>
                  <li onClick={() => searchCategory("Demon Slayer", "anime")}>
                    Demon Slayer
                  </li>
                  <li onClick={() => searchCategory("Dragon Ball", "anime")}>
                    Dragon Ball
                  </li>
                  <li
                    onClick={() =>
                      searchCategory("Fullmetal Alchemist", "anime")
                    }
                  >
                    Fullmetal Alchemist
                  </li>
                  <li
                    onClick={() => searchCategory("Hunter x Hunter", "anime")}
                  >
                    Hunter x Hunter
                  </li>
                  <li onClick={() => searchCategory("Jujutsu Kaisen", "anime")}>
                    Jujutsu Kaisen
                  </li>
                  <li
                    onClick={() => searchCategory("My Hero Academia", "anime")}
                  >
                    My Hero Academia
                  </li>
                  <li onClick={() => searchCategory("Naruto", "anime")}>
                    Naruto
                  </li>
                  <li onClick={() => searchCategory("One Piece", "anime")}>
                    One Piece
                  </li>
                  <li onClick={() => searchCategory("Pokemon", "anime")}>
                    Pokemon
                  </li>
                  <li onClick={() => searchCategory("Studio Ghibli", "anime")}>
                    Studio Ghibli
                  </li>
                  <li onClick={() => searchCategory("Other Anime", "anime")}>
                    (Other)
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li
            className="merch-dropdown"
            onMouseOver={() => setShowMerch(true)}
            onMouseLeave={() => setShowMerch(false)}
          >
            <button>MERCHANDISE</button>
            {showMerch && (
              <div className="dropdown-list">
                <ul>
                  <li onClick={() => searchCategory("Crewneck", "merch")}>
                    Crewnecks
                  </li>
                  <li onClick={() => searchCategory("Figurine", "merch")}>
                    Figurines
                  </li>
                  <li onClick={() => searchCategory("Hoodie", "merch")}>
                    Hoodies
                  </li>
                  <li onClick={() => searchCategory("Poster", "merch")}>
                    Posters
                  </li>
                  <li onClick={() => searchCategory("Shirt", "merch")}>
                    Shirts
                  </li>
                  <li
                    onClick={() =>
                      searchCategory("Ugly Christmas Sweater", "merch")
                    }
                  >
                    Ugly Christmas Sweaters
                  </li>
                  <li onClick={() => searchCategory("Other Merch", "merch")}>
                    (Other)
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        <div className="shopping-cart" onClick={() => navigate("/cart")}>
          <img
            className="cart-image"
            src="/images/shopping-cart-white.png"
            alt=""
          />
          {cart.length > 0 && (
            <div className="cart-quantity">{cartTotal()}</div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
