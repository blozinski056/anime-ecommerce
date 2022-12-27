import React from "react";

export default function Filters({ searchWord, category, filterTiles }) {
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const animeFilters = React.useMemo(
    () => [
      "ATTACK ON TITAN",
      "COWBOY BEBOP",
      "DEMON SLAYER",
      "DRAGON BALL",
      "FULLMETAL ALCHEMIST",
      "HUNTER X HUNTER",
      "JUJUTSU KAISEN",
      "MY HERO ACADEMIA",
      "NARUTO",
      "ONE PIECE",
      "POKEMON",
      "STUDIO GHIBLI",
      "OTHER ANIME",
    ],
    []
  );
  const merchFilters = React.useMemo(
    () => [
      "CREWNECK",
      "FIGURINE",
      "HOODIE",
      "POSTER",
      "SHIRT",
      "UGLY CHRISTMAS SWEATER",
      "OTHER MERCH",
    ],
    []
  );

  // Update checked filter whenever keyword changes
  React.useEffect(() => {
    // Reset values
    animeFilters.forEach((anime) => {
      document.querySelector(`[name='${anime}']`).checked = false;
    });
    merchFilters.forEach((merch) => {
      document.querySelector(`[name='${merch}']`).checked = false;
    });
    setMinPrice(0);
    setMaxPrice(0);
    document.querySelector(".min-price").value = "";
    document.querySelector(".max-price").value = "";
    document.querySelector(".max-price").min = 0;
    // Check filter based on keyword
    if (
      animeFilters.includes(category[1]) ||
      merchFilters.includes(category[1])
    ) {
      document.querySelector(`[name='${category[1]}']`).checked = true;
    }
    if (
      animeFilters.includes(searchWord) ||
      merchFilters.includes(searchWord)
    ) {
      document.querySelector(`[name='${searchWord}']`).checked = true;
    }
  }, [searchWord, category, animeFilters, merchFilters]);

  // Finds all checked boxes and values
  function getInputs(event) {
    event.preventDefault();
    // let animeWords = [];
    // let merchWords = [];
    let categoryWords = [];
    let priceRange = [minPrice, maxPrice];
    animeFilters.forEach((anime) => {
      const a = document.querySelector(`[name='${anime}']`);
      if (a.checked) {
        // animeWords.push(anime);
        categoryWords.push(anime);
      }
    });
    merchFilters.forEach((merch) => {
      const m = document.querySelector(`[name='${merch}']`);
      if (m.checked) {
        // merchWords.push(merch);
        categoryWords.push(merch);
      }
    });
    // filterTiles(searchWord, animeWords, merchWords, priceRange);
    filterTiles(searchWord, categoryWords, priceRange);
  }

  // If minimum value is input, sets min for maxPrice
  // If maxPrice already exists before min value is input, maxPrice will be notified is below min value
  function minPriceVal(event) {
    const min = event.target.value;
    const mp = document.querySelector(".max-price");
    mp.min = min;
    setMinPrice(min);
  }

  function maxPriceVal(event) {
    const max = event.target.value;
    setMaxPrice(max);
  }

  return (
    <form className="filter-sidebar" onSubmit={getInputs}>
      <ul className="anime">
        <h1>ANIME</h1>
        <li>
          <label>
            <input name="ATTACK ON TITAN" type="checkbox" /> Attack on Titan
          </label>
        </li>
        <li>
          <label>
            <input name="COWBOY BEBOP" type="checkbox" /> Cowboy Bebop
          </label>
        </li>
        <li>
          <label>
            <input name="DEMON SLAYER" type="checkbox" /> Demon Slayer
          </label>
        </li>
        <li>
          <label>
            <input name="DRAGON BALL" type="checkbox" /> Dragon Ball
          </label>
        </li>
        <li>
          <label>
            <input name="FULLMETAL ALCHEMIST" type="checkbox" /> Fullmetal
            Alchemist
          </label>
        </li>
        <li>
          <label>
            <input name="HUNTER X HUNTER" type="checkbox" /> Hunter x Hunter
          </label>
        </li>
        <li>
          <label>
            <input name="JUJUTSU KAISEN" type="checkbox" /> Jujutsu Kaisen
          </label>
        </li>
        <li>
          <label>
            <input name="MY HERO ACADEMIA" type="checkbox" /> My Hero Academia
          </label>
        </li>
        <li>
          <label>
            <input name="NARUTO" type="checkbox" /> Naruto
          </label>
        </li>
        <li>
          <label>
            <input name="ONE PIECE" type="checkbox" /> One Piece
          </label>
        </li>
        <li>
          <label>
            <input name="POKEMON" type="checkbox" /> Pokemon
          </label>
        </li>
        <li>
          <label>
            <input name="STUDIO GHIBLI" type="checkbox" /> Studio Ghibli
          </label>
        </li>
        <li>
          <label>
            <input name="OTHER ANIME" type="checkbox" /> (Other)
          </label>
        </li>
      </ul>
      <ul className="merch">
        <h1>MERCHANDISE</h1>
        <li>
          <label>
            <input name="CREWNECK" type="checkbox" /> Crewnecks
          </label>
        </li>
        <li>
          <label>
            <input name="FIGURINE" type="checkbox" /> Figurines
          </label>
        </li>
        <li>
          <label>
            <input name="HOODIE" type="checkbox" /> Hoodies
          </label>
        </li>
        <li>
          <label>
            <input name="POSTER" type="checkbox" /> Posters
          </label>
        </li>
        <li>
          <label>
            <input name="SHIRT" type="checkbox" /> Shirts
          </label>
        </li>
        <li>
          <label>
            <input name="UGLY CHRISTMAS SWEATER" type="checkbox" /> Ugly
            Christmas Sweaters
          </label>
        </li>
        <li>
          <label>
            <input name="OTHER MERCH" type="checkbox" /> (Other)
          </label>
        </li>
      </ul>
      <h1>PRICE RANGE</h1>
      <div>
        <span>Min. Price:</span>
        <input
          className="min-price"
          onChange={minPriceVal}
          min={0}
          type="number"
          placeholder="Min $"
        />
      </div>
      <div>
        <span>Max. Price:</span>
        <input
          className="max-price"
          onChange={maxPriceVal}
          min={0}
          type="number"
          placeholder="Max $"
        />
      </div>
      <button type="submit">Apply</button>
    </form>
  );
}
