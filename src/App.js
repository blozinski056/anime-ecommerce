import React from "react"
import "./App.css"
import HomePage from "./components/HomePage.js"
import Navbar from "./components/Navbar.js"
import ItemContainer from "./components/ItemContainer.js"
import TagFilters from "./components/TagFilters.js"
import Tiles from "./components/Tiles.js"
import data from "./components/data.js"

export default function App() {
  const [showHomePage, setShowHomePage] = React.useState(true);
  const [searchOn, setSearchOn] = React.useState(false);
  const [filteredTiles, setFilteredTiles] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [updateToggle, setUpdateToggle] = React.useState(true);

  const allTiles = data.map((item) => {
    return(
      <Tiles
        key={item.id}
        name={item.title}
        price={item.price}
        image={item.image}
      />
    )
  })

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
    console.log("from filter function:");
    console.log(f);
    return f;
  }

  // Used when search bar is activated
  // function searchedTiles(searchWord) {
  //   console.log(searchWord);

  //   const ft = filtering(searchWord, allTiles);
  //   // check if list of tiles is 0
  //   setFilteredTiles(ft);
  // }

  // Used when filter tab is activated
  function filterTiles(searchWord, animeWords, merchWords, priceRange) {
    console.log(searchWord, animeWords, merchWords, priceRange);
    let filtered = filtering(searchWord, allTiles);
    console.log("after search word");
    console.log(filtered);
    if(animeWords.length > 0) {
      console.log("anime start");
      let tempArray = [];
      animeWords.forEach((word) => {
        tempArray = tempArray.concat(filtering(word, filtered));
      })
      filtered = tempArray;
      console.log("anime end");
      console.log(filtered);
    }
    if(merchWords.length > 0) {
      console.log("merch start");
      let tempArray = [];
      merchWords.forEach((word) => {
        tempArray = tempArray.concat(filtering(word, filtered));
      })
      filtered = tempArray;
      console.log("merch end");
      console.log(filtered);
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

  return (
    <div>
      {/* HOME PAGE */}
      {showHomePage && 
        <HomePage 
          setShowHomePage={setShowHomePage}
          setSearchOn={setSearchOn}
          // searchedTiles={searchedTiles}
          filterTiles={filterTiles}
          setKeyword={setKeyword}
          setCategory={setCategory}
          updateToggle={updateToggle}
          setUpdateToggle={setUpdateToggle}
        />
      }

      {/* NAVBAR */}
      <Navbar 
        setShowHomePage={setShowHomePage}
        setSearchOn={setSearchOn}
        // searchedTiles={searchedTiles}
        filterTiles={filterTiles}
        setKeyword={setKeyword}
        setCategory={setCategory}
        updateToggle={updateToggle}
        setUpdateToggle={setUpdateToggle}
      />

      {/* SEARCH PAGE */}
      {searchOn &&
        <section className="search-page">
          {/* Side tab to sort by keywords/tags; make glass effect */}
          <TagFilters 
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

      {/* Tiles that can be sorted; make glass effect */}
      {/* tiles as array variable */}
      
    </div>
  )
}
