import React, { useState, useEffect } from "react";
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
  console.log('rendered deck')

  // useEffect for API call to get new deck
  useEffect(function fetchNewDeck() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/shuffle`);
      setDeck(deckResult.data);
    };
    fetchDeck();
  }, [setDeck]);

  // // useEffect for API call to get a card
  useEffect(function drawNewCard() {
    // console.log('begining of drawcard effect')
    async function drawCard() {
      try{
        const cardResult = await axios.get(`${BASE_URL}${deck.deck_id}/draw?count=1`);
        // cardResult.data.remaining === 0 ? alert("Error: no more cards remain") : null;
        if (cardResult.data.remaining === 50) {
          throw new Error("No more cards");
        }
        console.log("REMAINING CARDS IN DECK--->", cardResult.data.remaining);
        setIsDrawing(false)
        let drawnCard = cardResult.data.cards[0];
        //when you use the callback to your set function the argument you get is your previous state
  
        setCards(oldCards => [...oldCards, drawnCard])
        // console.log("CARDS AFTER DRAWN--->", cards);

      } catch(err) {
        alert(err);
      }
    }
    // console.log('middle of drawcard effect')
    if (isDrawing) drawCard();
    // console.log('end of drawcard effect')
  }, [deck, isDrawing]);

  function drawCard() {
    setIsDrawing(true);
  }


  // if remaining cards in deck > 0
  // useEffect for drawing a single card from deck

  // console.log("CARDS--->", cards);
  return (
    <div>
        <div>{ cards.map(card => (<Card key={card.code} image={card.image} name={card.name} />)) }
          <button onClick={drawCard}> Draw</button></div>
    </div>
  )

}

export default Deck;