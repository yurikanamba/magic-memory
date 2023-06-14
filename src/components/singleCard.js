import "./singleCard.css";

function singleCard({ card, setChoices, flippedConditions }) {
  const sendCardInfo = () => {
    setChoices(card);
  };
  return (
    <div className="card">
      <div className={flippedConditions ? "flipped" : ""}>
        <img src={card.src} alt="card-front" className="front" />
        <img
          src="/img/cover.png"
          alt="card-back"
          className="back"
          onClick={sendCardInfo}
        />
      </div>
    </div>
  );
}

export default singleCard;
