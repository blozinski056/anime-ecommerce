import React from "react";

export default function ItemContainer({ tilesArray }) {
  return (
    <section className="item-container">
      {tilesArray.length > 0 ? (
        tilesArray
      ) : (
        <h1 className="none-found">No items found!</h1>
      )}
    </section>
  );
}
