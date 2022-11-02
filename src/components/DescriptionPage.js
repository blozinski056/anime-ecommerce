import React from "react"

export default function DescriptionPage({descInfo, updateCart}) {
  const [size, setSize] = React.useState("M");
  const [img, setImg] = React.useState({img: descInfo.image, num: 1});

  // Defaults clothing size to medium
  React.useEffect(() => {
    if(descInfo.clothing) {
      document.querySelector(`[name=m]`).classList.add("clicked");
    }
  }, [])

  // When preview img is switched, changes style of preview buttons
  React.useEffect(() => {
    const elements = document.querySelectorAll(".preview");
    elements.forEach((elem) => {
      elem.classList.remove("preview-clicked");
    })
    img.num === 1 
      ? document.querySelector('[name="1"]').classList.add("preview-clicked")
      : document.querySelector('[name="2"]').classList.add("preview-clicked")
  }, [img])

  // Changes size button that is clicked
  function sizeChange(size) {
    setSize(size.toUpperCase());
    const elements = document.querySelectorAll(".size-button");
    elements.forEach(elem => {
      elem.classList.remove("clicked");
    })
    document.querySelector(`[name=${size}]`).classList.add("clicked");
  }

  function add() {
    updateCart(descInfo.image, descInfo.name, descInfo.price, descInfo.clothing, size, 1);
  }
  
  return (
    <section className="desc-page">
      <div className="desc-imgs">
        <img className="display-img" src={img.img} alt="" />
        <div className="desc-previews">
          <img 
            className="preview" 
            name="1"
            src={descInfo.image} 
            onClick={() => setImg({img: descInfo.image, num: 1})} 
            alt=""
          />
          {descInfo.image2 &&
            <img 
              className="preview" 
              name="2"
              src={descInfo.image2} 
              onClick={() => setImg({img: descInfo.image2, num: 2})}
              alt=""
            />
          }
        </div>
      </div>
      <div className="desc-info">
        <h1>{descInfo.name}</h1>
        <div className="desc-price-container">
          <h5>${descInfo.price}</h5>
          {descInfo.clothing &&
            <ul>
              <li><button className="size-button" name="xs" onClick={() => sizeChange("xs")}>XS</button></li>
              <li><button className="size-button" name="s" onClick={() => sizeChange("s")}>S</button></li>
              <li><button className="size-button" name="m" onClick={() => sizeChange("m")} >M</button></li>
              <li><button className="size-button" name="l" onClick={() => sizeChange("l")}>L</button></li>
              <li><button className="size-button" name="xl" onClick={() => sizeChange("xl")}>XL</button></li>
            </ul>
          }
          <button className="desc-add" onClick={add}>+ Add to Cart</button>
        </div>
        <h3>Product Description:</h3>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Phasellus a tincidunt dui, in fermentum leo.</li>
          <li>Pellentesque porta nec nisl ut fringilla.</li>
          <li>Nullam mi mauris, facilisis a dui id, vulputate pellentesque lacus.</li>
          <li>Nam nec nulla vitae est semper mollis id ac lacus.</li>
        </ul>
      </div>
    </section>
  )
}