import React from "react";
import { useParams } from "react-router-dom";

import FilterSidebar from "./FilterSidebar.js";
import ItemContainer from "./ItemContainer.js";

export default function SearchPageLayout({ allTiles, clickToggle }) {
  const { param1, param2 } = useParams();
  const [searchWord, setSearchWord] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [tilesArray, setTilesArray] = React.useState([]);

  // Used on 'HomePage', 'Navbar', and search page 'Filters'
  // Takes into account the searched keyword before filters for anime, merch, and price range
  // Sets 'filteredTiles' to display on search page
  const filterTiles = React.useCallback(
    (searchWords, animeWords, merchWords, priceRange) => {
      // filter based on search word
      let filtered = filtering(searchWords.toUpperCase(), allTiles);

      // filter based animes that were checked in filter tab
      if (animeWords.length > 0) {
        let tempArray = [];
        animeWords.forEach((word) => {
          tempArray = tempArray.concat(filtering(word, filtered));
        });
        filtered = tempArray;
      }

      // filter based on type of merch that was checked in filter tab
      if (merchWords.length > 0) {
        let tempArray = [];
        merchWords.forEach((word) => {
          tempArray = tempArray.concat(filtering(word, filtered));
        });
        filtered = tempArray;
      }

      // filter based on price range
      if (priceRange[0] || priceRange[1]) {
        let min = priceRange[0] ? priceRange[0] : 0;
        let max = priceRange[1] ? priceRange[1] : Number.MAX_SAFE_INTEGER;
        let tempArray = [];
        filtered.forEach((tile) => {
          if (tile.props.item.price >= min && tile.props.item.price <= max) {
            tempArray.push(tile);
          }
        });
        filtered = tempArray;
      }

      setTilesArray(filtered);
    },
    [allTiles]
  );

  // Used in filterTiles()
  // Returns new array based on give word
  function filtering(word, listOfTiles) {
    let f = [];
    if (word === "OTHER ANIME") {
      listOfTiles.forEach((tile) => {
        let name = tile.props.item.title;
        if (
          !name.includes("Attack on Titan") &&
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
          !name.includes("Studio Ghibli")
        ) {
          f.push(tile);
        }
      });
    } else if (word === "OTHER MERCH") {
      listOfTiles.forEach((tile) => {
        let name = tile.props.item.title;
        if (
          !name.includes("Crewneck") &&
          !name.includes("Figurine") &&
          !name.includes("Hoodie") &&
          !name.includes("Poster") &&
          !name.includes("Shirt") &&
          !name.includes("Ugly Christmas Sweater")
        ) {
          f.push(tile);
        }
      });
    } else if (word === "") {
      f = listOfTiles;
    } else {
      listOfTiles.forEach((tile) => {
        let name = tile.props.item.title.toUpperCase();
        if (name.includes(word)) {
          f.push(tile);
        }
      });
    }
    return f;
  }

  // Determine which parameter is the search word and which is the category
  React.useEffect(() => {
    if (param1 === undefined) {
      setSearchWord("");
      setCategory([]);
    } else if (param1 === param1.toUpperCase()) {
      setCategory([param1.slice(0, 5), param1.slice(5)]);
      if (param2 === undefined) {
        setSearchWord("");
      } else {
        setSearchWord(param2);
      }
    } else {
      setSearchWord(param1);
      if (param2 === undefined) {
        setCategory([]);
      } else {
        setCategory([param2.slice(0, 5), param2.slice(5)]);
      }
    }
  }, [param1, param2]);

  React.useEffect(() => {
    if (category[0] === "ANIME") {
      filterTiles(searchWord, [category[1]], [], []);
    } else if (category[0] === "MERCH") {
      filterTiles(searchWord, [], [category[1]], []);
    } else {
      filterTiles(searchWord, [], [], []);
    }
  }, [filterTiles, searchWord, category, clickToggle]);

  return (
    <section className="search-page-layout">
      <FilterSidebar
        searchWord={searchWord}
        category={category}
        filterTiles={filterTiles}
      />
      <ItemContainer tilesArray={tilesArray} />
    </section>
  );
}
