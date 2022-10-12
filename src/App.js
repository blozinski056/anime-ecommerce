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
  const [keyword, setKeyword] = React.useState("");

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

  function filteredTiles(searchWord) {
    let ft = allTiles;

    console.log(searchWord);

    if(searchWord === "") {
      return ft;
    } else {
      return ft = allTiles.map((tile) => {
        let name = tile.props.name.toUpperCase();
        if(name.includes(searchWord)) {
          return tile;
        }
      })
    }
  }

  return (
    <div>
      {/* HOME PAGE */}
      {showHomePage && 
        <HomePage 
          setShowHomePage={setShowHomePage}
          setSearchOn={setSearchOn}
          setKeyword={setKeyword}
        />
      }

      {/* NAVBAR */}
      <Navbar 
        setShowHomePage={setShowHomePage}
        setSearchOn={setSearchOn}
        keyword={keyword}
        setKeyword={setKeyword}
      />

      {/* SEARCH PAGE */}
      {searchOn &&
        <section className="search-page">
          {/* Side tab to sort by keywords/tags; make glass effect */}
          <TagFilters />
          
          {/* Determine which tiles to be displayed before passing */}
          <ItemContainer 
            tilesArray={filteredTiles(keyword)}
          />
        </section>
      }

      {/* Tiles that can be sorted; make glass effect */}
      {/* tiles as array variable */}
      
    </div>
  )
}
