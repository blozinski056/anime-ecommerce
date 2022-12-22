import React from "react";

export default function ItemContainer({ tilesArray }) {
  return tilesArray.length > 0 ? (
    <section className="item-container">{tilesArray}</section>
  ) : (
    <h1 className="none-found">No items found!</h1>
  );
}
