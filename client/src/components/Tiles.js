import React from "react";
import { useNavigate } from "react-router-dom";

export default function Tiles({ item, setItemDetails }) {
  const navigate = useNavigate();

  function openDescription() {
    setItemDetails(item);
    navigate(`/items/${item.id}`);
  }

  return (
    <div className="tiles">
      <img
        className="tile-img"
        src={item.image}
        alt=""
        onClick={() => openDescription()}
      />

      <div className="info-container">
        <h5 className="name" onClick={() => openDescription()}>
          {item.title}
        </h5>
        <h5 className="price">${item.price}</h5>
      </div>
    </div>
  );
}
