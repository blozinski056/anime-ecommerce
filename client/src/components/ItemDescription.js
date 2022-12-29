import React from "react";

export default function ItemDescription({ itemDetails, updateCart }) {
  const [size, setSize] = React.useState("M");
  const [preview, setPreview] = React.useState(itemDetails.image);

  React.useEffect(() => {
    if (preview === undefined) {
      setPreview(itemDetails.image);
    }
  }, [preview, itemDetails.image]);

  const changeImg = (imgNum) => {
    const img1 = document.querySelector(".img-1");
    const img2 = document.querySelector(".img-2");
    if (imgNum === 1) {
      img1.classList.add("clicked");
      img2 && img2.classList.remove("clicked");
      setPreview(itemDetails.image);
    } else {
      img1.classList.remove("clicked");
      img2.classList.add("clicked");
      setPreview(itemDetails.image2);
    }
  };

  // Defaults clothing size to medium
  React.useEffect(() => {
    if (itemDetails.clothing) {
      document.querySelector(`[name=m]`).classList.add("clicked");
    }
  }, [itemDetails.clothing]);

  // Changes size button that is clicked
  function sizeChange(size) {
    setSize(size.toUpperCase());
    const elements = document.querySelectorAll(".size-button");
    elements.forEach((elem) => {
      elem.classList.remove("clicked");
    });
    document.querySelector(`[name=${size}]`).classList.add("clicked");
  }

  function add() {
    const addBtn = document.querySelector(".item-add");
    addBtn.classList.add("added");
    addBtn.innerHTML = "✔️ Added";
    addBtn.style.pointerEvents = "none";
    setTimeout(() => {
      addBtn.classList.remove("added");
      addBtn.innerHTML = "+ Add to Cart";
      addBtn.style.pointerEvents = "auto";
    }, 1000);

    updateCart(itemDetails, size, 1);
  }

  return (
    <section className="item-desc">
      <div className="img-container">
        <img src={preview} alt="" className="img-display" />
        <div className="img-previews">
          <img
            src={itemDetails.image}
            alt=""
            className="img-1 clicked"
            onClick={() => changeImg(1)}
          />
          {itemDetails.image2 && (
            <img
              src={itemDetails.image2}
              alt=""
              className="img-2"
              onClick={() => changeImg(2)}
            />
          )}
        </div>
      </div>
      <div className="item-info">
        <h1>{itemDetails.title}</h1>
        <div className="item-price-container">
          <h3 className="item-price">${itemDetails.price}</h3>
          <button className="item-add" onClick={() => add()}>
            + Add to Cart
          </button>
          {itemDetails.clothing && (
            <ul className="item-size-buttons">
              <li>
                <button
                  className="size-button"
                  name="xs"
                  onClick={() => sizeChange("xs")}
                >
                  XS
                </button>
              </li>
              <li>
                <button
                  className="size-button"
                  name="s"
                  onClick={() => sizeChange("s")}
                >
                  S
                </button>
              </li>
              <li>
                <button
                  className="size-button"
                  name="m"
                  onClick={() => sizeChange("m")}
                >
                  M
                </button>
              </li>
              <li>
                <button
                  className="size-button"
                  name="l"
                  onClick={() => sizeChange("l")}
                >
                  L
                </button>
              </li>
              <li>
                <button
                  className="size-button"
                  name="xl"
                  onClick={() => sizeChange("xl")}
                >
                  XL
                </button>
              </li>
            </ul>
          )}
        </div>
        <h3>PRODUCT DESCRIPTION</h3>
        <ul className="product-description">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Phasellus a tincidunt dui, in fermentum leo.</li>
          <li>Pellentesque porta nec nisl ut fringilla.</li>
          <li>
            Nullam mi mauris, facilisis a dui id, vulputate pellentesque lacus.
          </li>
          <li>Nam nec nulla vitae est semper mollis id ac lacus.</li>
        </ul>
        <h3 className="reviews-header">REVIEWS</h3>
        <ul className="reviews">
          <li>
            <div>
              <h5 className="username">USERNAME</h5>
              <h5>4.5</h5>
              <img src="/images/star.png" alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </li>
          <li>
            <div>
              <h5 className="username">USERNAME 2</h5>
              <h5>3.0</h5>
              <img src="/images/star.png" alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
