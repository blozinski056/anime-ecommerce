import React from "react"

export default function Tiles({name, price, image}) {

  return (
    <section className="tiles">
      <img src={image} />

      <div className="info-container">
        <h5 className="name">{name}</h5>
        <h5 className="price">{price}</h5>
      </div>

    </section>
  )
}