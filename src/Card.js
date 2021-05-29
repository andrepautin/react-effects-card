import React from "react";

/**
 * Props:
 * - card: {image, value, suit, code}
 * 
 * Deck -> Card
 */
function Card({name, image}) {
  return (
    <img alt={name} src={image}/>
  )
}

export default Card;