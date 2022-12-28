import React from "react";

export default function ShoppingCart({ cart, updateCart }) {
  const [subtotal, setSubtotal] = React.useState(0);
  const [displayCart, setDisplayCart] = React.useState([]);

  const changeQty = React.useCallback(
    (itemKey, itemObj, itemSize, itemQty) => {
      const currentQty = document.querySelector(`[name="${itemKey}"]`).value;
      const newQty = currentQty - itemQty;
      updateCart(itemObj, itemSize, newQty);
    },
    [updateCart]
  );

  // Creates and updates tiles for each item in the shopping 'cart'
  React.useEffect(() => {
    let newSubtotal = 0;
    const newDisplayCart = cart.map((item) => {
      newSubtotal += item.quantity * item.obj.price;
      const key =
        item.obj.title.replace(/\s+/g, "").replace(":", "") + item.size;

      return (
        <div className="cart-tile" key={key}>
          <img src={item.obj.image} alt="" />
          <div>
            <h3>{item.obj.title}</h3>
            {item.obj.clothing && <h5>Size: {item.size}</h5>}
            <h5 className="qty">
              Quantity:
              <input
                className="qty-count"
                name={key}
                type="number"
                onChange={() =>
                  changeQty(key, item.obj, item.size, item.quantity)
                }
                defaultValue={item.quantity}
                min={1}
              />
            </h5>
            <button
              onClick={() => updateCart(item.obj, item.size, -item.quantity)}
            >
              Remove
            </button>
          </div>
          <h3>x</h3>
          <h3>${item.obj.price} each</h3>
          <h3>=</h3>
          <h2>${item.quantity * item.obj.price}</h2>
        </div>
      );
    });
    setSubtotal(newSubtotal);
    setDisplayCart(newDisplayCart);
  }, [cart, changeQty, updateCart]);

  return (
    <section className="shopping-cart-page">
      <h1 className="cart-header">Your Cart: </h1>
      {displayCart}
      <div className="cart-total">
        <h1>Total: ${subtotal}</h1>
        <button>Checkout</button>
      </div>
    </section>
  );
}
