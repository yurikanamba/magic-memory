import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/singleCard";

const images = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    if (choiceTwo) {
      compareChoices();
      setTurns((currentTurns) => currentTurns++);
      resetChoices();
    }
  }, [choiceTwo]);

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
    return choiceOne.src === choiceTwo.src;
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
