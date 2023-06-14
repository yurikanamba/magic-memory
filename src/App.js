import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/singleCard";

const images = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    if (choiceTwo) {
      compareChoices();
      setTurns((currentTurns) => (currentTurns = currentTurns + 1));
    }
  }, [choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  function shuffleCards() {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image) => ({ ...image, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  }

  function setChoices(cardInfo) {
    choiceOne ? setChoiceTwo(cardInfo) : setChoiceOne(cardInfo);
  }

  function compareChoices() {
    if (choiceOne.src === choiceTwo.src) {
      setCards((currentCards) => {
        return currentCards.map((originalCard) => {
          return originalCard.src === choiceOne.src
            ? { ...originalCard, matched: true }
            : originalCard;
        });
      });
      resetChoices();
    } else {
      setTimeout(resetChoices, 500);
    }
  }

  function flippedConditions(card) {
    return Boolean(card === choiceOne || card === choiceTwo || card.matched);
  }

  function resetChoices() {
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            setChoices={setChoices}
            choiceTwo={choiceTwo}
            flippedConditions={flippedConditions(card)}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
