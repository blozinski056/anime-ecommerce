import React from "react"

export default function TagFilters() {

  return (
    <section className="tag-filters">
      <ul className="anime">
        <h1>Anime</h1>
        <li><input type="checkbox" /> Attack on Titan</li>
        <li><input type="checkbox" /> Bleach</li>
        <li><input type="checkbox" /> Cowboy Bebop</li>
        <li><input type="checkbox" /> Death Note</li>
        <li><input type="checkbox" /> Demon Slayer</li>
        <li><input type="checkbox" /> Dragon Ball</li>
        <li><input type="checkbox" /> Fullmetal Alchemist</li>
        <li><input type="checkbox" /> Haikyuu!!</li>
        <li><input type="checkbox" /> Hunter x Hunter</li>
        <li><input type="checkbox" /> Jujutsu Kaisen</li>
        <li><input type="checkbox" /> My Hero Academia</li>
        <li><input type="checkbox" /> Naruto</li>
        <li><input type="checkbox" /> One Piece</li>
        <li><input type="checkbox" /> One Punch Man</li>
        <li><input type="checkbox" /> Pokemon</li>
        <li><input type="checkbox" /> Sword Art Online</li>
        <li><input type="checkbox" /> Studio Ghibli</li>
        <li><input type="checkbox" /> (Other)</li>
      </ul>

      <ul className="merch-type">
        <h1>Type of Merchandise</h1>
        <li><input type="checkbox" /> Shirts</li>
        <li><input type="checkbox" /> Hoodies/Sweatshirts</li>
        <li><input type="checkbox" /> Socks</li>
        <li><input type="checkbox" /> Cups</li>
        <li><input type="checkbox" /> Posters</li>
        <li><input type="checkbox" /> (Other)</li>
      </ul>

      <ul>
        <h1>Price Range</h1>
        <input placeholder="Min $" />
        <input placeholder="Max $" />
        <input type="submit"></input>
      </ul>
    </section>
  )
}