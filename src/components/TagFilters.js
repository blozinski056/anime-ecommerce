import React from "react"

export default function TagFilters({filterTiles}) {


  function getInputs(event) {
    event.preventDefault();

    const checkFilters = [
      {name: "Attack on Titan", value: document.querySelector(".aot").checked},
      {name: "Cowboy Bebop", value: document.querySelector(".cb").checked},
      {name: "Demon Slayer", value: document.querySelector(".ds").checked},
      {name: "Dragon Ball", value: document.querySelector(".db").checked},
      {name: "Fullmetal Alchemist", value: document.querySelector(".fma").checked},
      {name: "Hunter x Hunter", value: document.querySelector(".hxh").checked},
      {name: "Jujutsu Kaisen", value: document.querySelector(".jjk").checked},
      {name: "My Hero Academia", value: document.querySelector(".mha").checked},
      {name: "Naruto", value: document.querySelector(".nar").checked},
      {name: "One Piece", value: document.querySelector(".op").checked},
      {name: "Pokemon", value: document.querySelector(".pok").checked},
      {name: "Studio Ghibli", value: document.querySelector(".sg").checked},
      {name: "Other Anime", value: document.querySelector(".other-anime").checked},
      {name: "Crewneck", value: document.querySelector(".crewnecks").checked},
      {name: "Figurine", value: document.querySelector(".figurines").checked},
      {name: "Hoodie", value: document.querySelector(".hoodies").checked},
      {name: "Poster", value: document.querySelector(".posters").checked},
      {name: "Shirt", value: document.querySelector(".shirts").checked},
      {name: "Ugly Christmas Sweater", value: document.querySelector(".ucs").checked},
      {name: "Other Merch", value: document.querySelector(".other-merch").checked}
    ]

    let checkedWords = [];

    for(let i = 0; i < checkFilters.length; i++) {
        if(checkFilters[i].value) {
          checkedWords.push(checkFilters[i].name.toUpperCase());
        }
    }

    console.log(checkedWords);

    filterTiles(checkedWords);
  }

  return (
    <section className="tag-filters">
      <form onSubmit={getInputs}>
        <ul className="anime">
          <h1>Anime</h1>
          <li><input className="aot" type="checkbox" /> Attack on Titan</li>
          <li><input className="cb" type="checkbox" /> Cowboy Bebop</li>
          <li><input className="ds" type="checkbox" /> Demon Slayer</li>
          <li><input className="db" type="checkbox" /> Dragon Ball</li>
          <li><input className="fma" type="checkbox" /> Fullmetal Alchemist</li>
          <li><input className="hxh" type="checkbox" /> Hunter x Hunter</li>
          <li><input className="jjk" type="checkbox" /> Jujutsu Kaisen</li>
          <li><input className="mha" type="checkbox" /> My Hero Academia</li>
          <li><input className="nar" type="checkbox" /> Naruto</li>
          <li><input className="op" type="checkbox" /> One Piece</li>
          <li><input className="pok" type="checkbox" /> Pokemon</li>
          <li><input className="sg" type="checkbox" /> Studio Ghibli</li>
          <li><input className="other-anime" type="checkbox" /> (Other)</li>
        </ul>

        <ul className="merch-type">
          <h1>Type of Merchandise</h1>
          <li><input className="crewnecks" type="checkbox" /> Crewnecks</li>
          <li><input className="figurines" type="checkbox" /> Figurines</li>
          <li><input className="hoodies" type="checkbox" /> Hoodies</li>
          <li><input className="posters" type="checkbox" /> Posters</li>
          <li><input className="shirts" type="checkbox" /> Shirts</li>
          <li><input className="ucs" type="checkbox" /> Ugly Christmas Sweaters</li>
          <li><input className="other-merch" type="checkbox" /> (Other)</li>
        </ul>

        <ul>
          <h1>Price Range</h1>
          <input placeholder="Min $" />
          <input placeholder="Max $" />
        </ul>

        <button type="submit">Apply</button>
      </form>
    </section>
  )
}