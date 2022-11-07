import React from "react"

export default function ShoppingCartPage({cart, updateCart}) {
  const [subtotal, setSubtotal] = React.useState(0);
  const [displayCart, setDisplayCart] = React.useState([]);
  
  // Creates and updates tiles for each item in the shopping 'cart'
  React.useEffect(() => {
    let newSubtotal = 0;
    const newDisplayCart = cart.map((item) => {
      newSubtotal += item.quantity * item.price;
      const key = item.name.replace(/\s+/g, "").replace(':', "") + item.size;
      return (
        <div className="cart-tile" key={key}>
          <img src={item.image} alt="" />
          <div>
            <h3>{item.name}</h3>
            {item.clothing &&
              <h5>Size: {item.size}</h5>
            }
            <h5 className="qty">Quantity:
              <input 
                className="qty-count"
                name={key}
                type="number"
                onChange={() => changeQty(key, item.name, item.size, item.quantity)}
                defaultValue={item.quantity}
                min={1}
              />
            </h5>
            <button onClick={() => updateCart("", item.name, "", "", item.size, -item.quantity)}>Remove</button>
          </div>
          <h3>x</h3>
          <h3>${item.price} each</h3>
          <h3>=</h3>
          <h2>${item.quantity * item.price}</h2>
        </div>
      )
    })
    setSubtotal(newSubtotal);
    setDisplayCart(newDisplayCart);
  }, [cart])

  function changeQty(itemKey, itemName, itemSize, itemQty) {
    const currentQty = document.querySelector(`[name="${itemKey}"]`).value;
    const newQty = currentQty - itemQty;
    updateCart("", itemName, "", "", itemSize, newQty);
  }

  return (
    <section className="cart-page">
      <h1 className="cart-header">Your Cart: </h1>
      {displayCart}
      <div className="cart-total">
        <h1>Total: ${subtotal}</h1>
        <button>Checkout</button>
      </div>
    </section>
  )
}