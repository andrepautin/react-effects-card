import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";

/**
 * State:
 * - array of cards = [{image, value, suit, code}, {image, value, suit, code}, ...]
 * - isDrawing (true/false) -> default false (to know when a card is being drawn)
 * 
 * App -> Deck -> Card
 */

const BASE_URL = "https://deckofcardsapi.com/api/deck/";
let deckId;
const DRAW_CARD_URL = `${deckId}/draw/?count=1`;

function Deck() {
  const [cards, setCards] = useState([]);
  // useEffect for API call to get new deck
  useEffect(function fetchNewDeck() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new`);
      deckId = deckResult.data.deck_id;
      setCards(deckResult.data);
      // setIsDrawing(false);
    }
    fetchDeck();
  }, []);

  // if remaining cards in deck > 0
    // useEffect for drawing a single card from deck

  return (
    <div>No deck yet</div>
  )
}

export default Deck;