import React from "react"

export default function Tiles({name, price, image, image2, clothing, openDescPage}) {
  return (
    <section className="tiles">
      <img className="tile-img" src={image} alt="" onClick={() => openDescPage(image, name, price, image2, clothing)} />

      <div className="info-container">
        <h5 className="name" onClick={() => openDescPage(image, name, price, image2, clothing)}>{name}</h5>
        <h5 className="price">${price}</h5>
      </div>

    </section>
  )
}