import React from "react"
import "./App.css"
import HomePage from "./components/HomePage.js"
import Navbar from "./components/Navbar.js"
import ItemContainer from "./components/ItemContainer.js"
import Filters from "./components/Filters.js"
import Tiles from "./components/Tiles.js"
import DescriptionPage from "./components/DescriptionPage.js"
import ShoppingCartPage from "./components/ShoppingCartPage.js"
import data from "./components/data.js"

export default function App() {
  const [showHome, setShowHome] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(false);
  const [showDesc, setShowDesc] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const [filteredTiles, setFilteredTiles] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [updateToggle, setUpdateToggle] = React.useState(true);
  const [descInfo, setDescInfo] = React.useState({image: "", name: "", price: "", image2: "", clothing: false});
  const [cart, setCart] = React.useState([]);
  const allTiles = data.map((item) => {
    const img2 = item.image2 ? item.image2 : "";
    return(
      <Tiles
        key={item.id}
        name={item.title}
        price={item.price}
        image={item.image}
        image2={img2}
        clothing={item.clothing}
        openDescPage={openDescPage}
      />
    )
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [updateToggle])

  // Returns new array based on keyword
  function filtering(word, listOfTiles) {
    let f = [];
    if(word === "OTHER ANIME") {
      listOfTiles.forEach((tile) => {
        let name = tile.props.name;
        if(!name.includes("Attack on Titan") &&
          !name.includes("Cowboy Bebop") &&
          !name.includes("Demon Slayer") &&
          !name.includes("Dragon Ball") &&
          !name.includes("Fullmetal Alchemist") &&
          !name.includes("Hunter x Hunter") &&
          !name.includes("Jujutsu Kaisen") &&
          !name.includes("My Hero Academia") &&
          !name.includes("Naruto") &&
          !name.includes("One Piece") &&
          !name.includes("Pokemon") &&
          !name.includes("Studio Ghibli")) {
            f.push(tile);
          }
      })
    } else if(word === "OTHER MERCH") {
      listOfTiles.forEach((tile) => {
        let name = tile.props.name;
        if(!name.includes("Crewneck") &&
          !name.includes("Figurine") &&
          !name.includes("Hoodie") &&
          !name.includes("Poster") &&
          !name.includes("Shirt") &&
          !name.includes("Ugly Christmas Sweater")) {
            f.push(tile);
          }
      })
    } else if(word === "") {
      f = listOfTiles;
    } else {
      listOfTiles.forEach((tile) => {
        let name = tile.props.name.toUpperCase();
        if(name.includes(word)) {
          f.push(tile);
        }
      })
    }
    return f;
  }

  // Used when filter tab is activated
  function filterTiles(searchWord, animeWords, merchWords, priceRange) {
    let filtered = filtering(searchWord, allTiles);
    if(animeWords.length > 0) {
      let tempArray = [];
      animeWords.forEach((word) => {
        tempArray = tempArray.concat(filtering(word, filtered));
      })
      filtered = tempArray;
    }
    if(merchWords.length > 0) {
      let tempArray = [];
      merchWords.forEach((word) => {
        tempArray = tempArray.concat(filtering(word, filtered));
      })
      filtered = tempArray;
    }
    if(priceRange[0] || priceRange[1]) {
      let min, max;
      priceRange[0] ? min = priceRange[0] : min = 0;
      priceRange[1] ? max = priceRange[1] : max = Number.MAX_SAFE_INTEGER;
      let tempArray = [];
      filtered.forEach((tile) => {
        if(tile.props.price >= min && tile.props.price <= max) {
          tempArray.push(tile);
        }
      })
      filtered = tempArray;
    }

    setFilteredTiles(filtered);
  }

  // Adds 1 to item quantity if it exists, adds item if it does not
  function updateCart(itemImage, itemName, itemPrice, itemSize, itemQuantity) {
    let updated = false;
    let newCart = [];
    cart.forEach((i) => {
      // if item matches
      if(i.name === itemName && i.size === itemSize) {
        updated = true;
        // if item was not removed, push item with updated qty onto array
        if(i.quantity + itemQuantity > 0) {
          // increase quantity by itemQuantity
          newCart.push(
            {
              image: i.image,
              name: i.name,
              price: i.price,
              size: i.size,
              quantity: i.quantity + itemQuantity
            }
          )
        }
        // if item was removed, nothing for i is pushed onto array 
      } else {
        // if doesn't match, return item unchanged
        newCart.push(i);
      }
    })
    const newItem = {
      image: itemImage,
      name: itemName,
      price: itemPrice,
      size: itemSize,
      quantity: itemQuantity
    }
    // if item was found and updated
    updated 
      // then set new cart
      ? setCart(newCart)
      // else add new item to cart
      : setCart(prevCart => 
        [...prevCart, newItem])
  }
  
  function openHome() {
    setShowHome(true);
    setShowSearch(false);
    setShowDesc(false);
    setShowCart(false);
    document.querySelector(".search-bar").value = "";
    setUpdateToggle(!updateToggle);
  }

  function openSearch() {
    setShowSearch(true);
    setShowHome(false);
    setShowDesc(false);
    setShowCart(false);
    setUpdateToggle(!updateToggle);
  }

  function openDescPage(descImg, descName, descPrice, descImg2, descClothing) {
    setDescInfo({image: descImg, name: descName, price: descPrice, image2: descImg2, clothing: descClothing});
    setShowHome(false);
    setShowSearch(false);
    setShowDesc(true);
    setShowCart(false);
    document.querySelector(".search-bar").value = "";
    setUpdateToggle(!updateToggle);
  }

  function openCart() {
    setShowSearch(false);
    setShowDesc(false);
    setShowCart(true);
    document.querySelector(".search-bar").value = "";
    setUpdateToggle(!updateToggle);
  }

  // rain effect
  // React.useEffect(() => {
  //   let amount = 30;
  //   let body = document.querySelector("body");
  //   for(let i = 0; i < amount; i++) {
  //     let drop = document.createElement("div");
  //     drop.className = "rain-element";
  //     // let dropImg = document.createElement("img");
  //     // dropImg.className = "rain-pic";
  //     // dropImg.src = "./images/rasengan.png";
  //     // dropImg.alt = "";
  //     // drop.appendChild(dropImg);
  //     let size = Math.random() * 5;
  //     let posX = Math.floor(Math.random() * (window.innerWidth * 2));
  //     let delay = Math.random() * -20;
  //     let duration = Math.random() * 7 + 7;

  //     drop.style.width = 5 + size + "px";
  //     drop.style.left = posX + "px";
  //     drop.style.animationDelay = delay + "s";
  //     drop.style.animationDuration = duration + "s";
  //     body.appendChild(drop);
  //   }
  // }, [])
    

  return (
    <div>
      {/* HOME PAGE */}
      {showHome && 
        <HomePage 
          openSearch={openSearch}
          filterTiles={filterTiles}
          setKeyword={setKeyword}
          setCategory={setCategory}
        />
      }

      {/* NAVBAR */}
      <Navbar 
        openSearch={openSearch}
        openHome={openHome}
        filterTiles={filterTiles}
        setKeyword={setKeyword}
        setCategory={setCategory}
        cart={cart}
        openCart={openCart}
      />

      {/* SEARCH PAGE */}
      {showSearch &&
        <section className="search-page">
          {/* Side tab to sort by keywords/tags; make glass effect */}
          <Filters 
            filterTiles={filterTiles}
            keyword={keyword}
            category={category}
            updateToggle={updateToggle}
          />
          {/* Determine which tiles to be displayed before passing */}
          <ItemContainer 
            tilesArray={filteredTiles}
          />
        </section>
      }

      {/* DESCRIPTION PAGE */}
      {/* NEEDS TO DISPLAY "ADDED TO CART" */}
      {showDesc &&
        <DescriptionPage 
          descInfo={descInfo}
          updateCart={updateCart}
        />
      }

      {/* SHOPPING CART PAGE */}
      {showCart &&
        <ShoppingCartPage 
          cart={cart}
          updateCart={updateCart}
        />
      }
    </div>
  )
}
