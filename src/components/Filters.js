import React from "react"

export default function Filters({filterTiles, keyword, category, updateToggle}) {
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const animeFilters = [
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
    "OTHER ANIME"
  ]
  const merchFilters = [
    "CREWNECK",
    "FIGURINE",
    "HOODIE",
    "POSTER",
    "SHIRT",
    "UGLY CHRISTMAS SWEATER",
    "OTHER MERCH",
  ]

  // Update checked filter whenever keyword changes
  React.useEffect(() => {
    // Reset values
    animeFilters.forEach((anime) => {
      document.querySelector('[name="' + CSS.escape(anime) + '"]').checked = false;
    })
    merchFilters.forEach((merch) => {
      document.querySelector('[name="' + CSS.escape(merch) + '"]').checked = false;
    })
    setMinPrice(0);
    setMaxPrice(0);
    document.querySelector(".min-price").value = '';
    document.querySelector(".max-price").value = '';
    document.querySelector(".max-price").min = 0;
    // Check filter based on keyword
    if(animeFilters.includes(category) || merchFilters.includes(category)) {
      document.querySelector('[name="' + CSS.escape(category) + '"]').checked = true;
    }
    if(animeFilters.includes(keyword) || merchFilters.includes(keyword)) {
      document.querySelector('[name="' + CSS.escape(keyword) + '"]').checked = true;
    }
  }, [category, keyword, updateToggle])

  function getInputs(event) {
    event.preventDefault();
    let animeWords = [];
    let merchWords = [];
    let priceRange = [minPrice, maxPrice];
    animeFilters.forEach((anime) => {
      const a = document.querySelector('[name="' + CSS.escape(anime) + '"]');
      if(a.checked) {
        animeWords.push(anime);
      }
    })
    merchFilters.forEach((merch) => {
      const m = document.querySelector('[name="' + CSS.escape(merch) + '"]');
      if(m.checked) {
        merchWords.push(merch);
      }
    })

    console.log(animeWords);
    console.log(merchWords);
    console.log(priceRange[0] + ", " + priceRange[1]);
    filterTiles(keyword, animeWords, merchWords, priceRange);
  }

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
    <section className="filters">
      <form onSubmit={getInputs}>
        <ul className="anime">
          <h1>Anime</h1>
          <li><label><input name="ATTACK ON TITAN" type="checkbox" /> Attack on Titan</label></li>
          <li><label><input name="COWBOY BEBOP" type="checkbox" /> Cowboy Bebop</label></li>
          <li><label><input name="DEMON SLAYER" type="checkbox" /> Demon Slayer</label></li>
          <li><label><input name="DRAGON BALL" type="checkbox" /> Dragon Ball</label></li>
          <li><label><input name="FULLMETAL ALCHEMIST" type="checkbox" /> Fullmetal Alchemist</label></li>
          <li><label><input name="HUNTER X HUNTER" type="checkbox" /> Hunter x Hunter</label></li>
          <li><label><input name="JUJUTSU KAISEN" type="checkbox" /> Jujutsu Kaisen</label></li>
          <li><label><input name="MY HERO ACADEMIA" type="checkbox" /> My Hero Academia</label></li>
          <li><label><input name="NARUTO" type="checkbox" /> Naruto</label></li>
          <li><label><input name="ONE PIECE" type="checkbox" /> One Piece</label></li>
          <li><label><input name="POKEMON" type="checkbox" /> Pokemon</label></li>
          <li><label><input name="STUDIO GHIBLI" type="checkbox" /> Studio Ghibli</label></li>
          <li><label><input name="OTHER ANIME" type="checkbox" /> (Other)</label></li>
        </ul>
        <ul className="merch">
          <h1>Type of Merchandise</h1>
          <li><label><input name="CREWNECK" type="checkbox" /> Crewnecks</label></li>
          <li><label><input name="FIGURINE" type="checkbox" /> Figurines</label></li>
          <li><label><input name="HOODIE" type="checkbox" /> Hoodies</label></li>
          <li><label><input name="POSTER" type="checkbox" /> Posters</label></li>
          <li><label><input name="SHIRT" type="checkbox" /> Shirts</label></li>
          <li><label><input name="UGLY CHRISTMAS SWEATER" type="checkbox" /> Ugly Christmas Sweaters</label></li>
          <li><label><input name="OTHER MERCH" type="checkbox" /> (Other)</label></li>
        </ul>
        <h1>Price Range</h1>
        <div>
          <span>Min. Price:</span>
          <input className="min-price" onChange={minPriceVal} min={0} type="number" placeholder="Min $" />
        </div>
        <div>
          <span>Max. Price:</span>
          <input className="max-price" onChange={maxPriceVal} min={0} type="number" placeholder="Max $" />
        </div>
        <button type="submit">Apply</button>
      </form>
    </section>
  )
}