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


function Deck() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  console.log('rendered dec')

  // useEffect for API call to get new deck
  useEffect(function fetchNewDeck() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new`);
      setDeck(deckResult.data);
    };
    fetchDeck();
  }, [setDeck]);
  // console.log('deck', deck)

  // // useEffect for API call to get a card
  useEffect(function drawNewCard() {
    console.log('begining of drawcard effect')
    console.log('deck', deck)
    async function drawCard() {
      const cardResult = await axios.get(`${BASE_URL}${deck.deck_id}/draw?count=1`);
      setIsDrawing(false)
      let drawnCard= cardResult.data;
      //when you use the callback to your set function the argument you get is your previous state

      setCards(oldCards => [...oldCards, drawnCard])

      // setIsDrawing(false);
    }
    console.log('middle of drawcard effect')
    if(isDrawing) drawCard();
    console.log('end of drawcard effect')
  }, [deck,isDrawing]);

  function drawCard(){
    setIsDrawing(true);
  }


  // if remaining cards in deck > 0
    // useEffect for drawing a single card from deck

  return (
    <div>
    <div>No deck yet</div>
    <button onClick={drawCard}> Draw</button>
    </div>
  )
}

export default Deck;