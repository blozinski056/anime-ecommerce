import React from "react"
import "./App.css"
import HomePage from "./components/HomePage.js"
import Navbar from "./components/Navbar.js"
import ItemContainer from "./components/ItemContainer.js"
import TagFilters from "./components/TagFilters.js"
import Tiles from "./components/Tiles.js"
// database for items

// some variable that makes the tiles and puts into array

export default function App() {
  // use this State to toggle sidebar filters; add to css element name if on
  const [showHomePage, setShowHomePage] = React.useState(true);
  const [filtersOn, setFiltersOn] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  return (
    <div>
      {/* HOME PAGE */}
      {showHomePage && 
        <HomePage 
          setShowHomePage={setShowHomePage}
          setFiltersOn={setFiltersOn}
          setKeyword={setKeyword}
        />
      }

      <Navbar 
        setShowHomePage={setShowHomePage}
        setFiltersOn={setFiltersOn}
        setKeyword={setKeyword}
      />

      {/* Render description page or other stuff */}

      {/* Body */}
      <ItemContainer />

      {/* Side tab to sort by keywords/tags; make glass effect */}
      {filtersOn && <TagFilters />}

      {/* Tiles that can be sorted; make glass effect */}
      {/* tiles as array variable */}
      
    </div>
  )
}
