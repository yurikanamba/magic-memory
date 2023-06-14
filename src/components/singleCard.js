import "./singleCard.css";

function singleCard({ card, setChoices }) {
  const sendCardInfo = () => {
    setChoices(card);
  };
  return (
    <div className="card">
      <img src={card.src} alt="card-front" />
      <img src="/img/cover.png" alt="card-back" onClick={sendCardInfo} />
    </div>
  );
}

export default singleCard;
