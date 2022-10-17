import React from "react"

export default function DescriptionPage({descInfo, addToCart}) {
  
  return (
    <section className="desc-page">
      <img className="desc-img" src={descInfo.image} />
      <div>
        <h1>{descInfo.name}</h1>
        <div>
          <h5>${descInfo.price}</h5>
          <button onClick={addToCart}>+ Add to Cart</button>
        </div>
      </div>
    </section>
  )
}