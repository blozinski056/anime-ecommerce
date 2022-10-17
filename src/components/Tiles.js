import React from "react"

export default function Tiles({name, price, image, openDescPage}) {
  function zoom(e) {
    // X position relative to top left corner of image
    // console.log(e.clientX - e.currentTarget.offsetLeft);

    // Y position relative to top left corner of image
    // console.log(e.clientY - e.currentTarget.offsetTop);

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    // console.log(e);
    console.log("mouse coords: " + x + ", " + y);

  }

  return (
    <section className="tiles" onClick={() => openDescPage(image, name, price)}>
      <img className="tile-img" src={image} onMouseMove={zoom} />

      <div className="info-container">
        <h5 className="name">{name}</h5>
        <h5 className="price">${price}</h5>
      </div>

    </section>
  )
}