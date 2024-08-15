import { useEffect, useState } from "react";

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (playerMoves) => {
  return combinations.some((combination) =>
    combination.every((index) => playerMoves.includes(index))
  );
};

function App() {
  const [player, setPlayer] = useState("❌");
  const [game, setGame] = useState({});
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const xMoves = Object.keys(game)
      .filter((key) => game[key] === "❌")
      .map((key) => parseInt(key, 10));

    const oMoves = Object.keys(game)
      .filter((key) => game[key] === "⭕")
      .map((key) => parseInt(key, 10));

    if (checkWinner(xMoves)) {
      setWinner("❌");
    } else if (checkWinner(oMoves)) {
      setWinner("⭕");
    }
  }, [game]);

  const handleClick = (e) => {
    const squareId = e.target.id;
    if (game[squareId] || !squareId || winner) return;
    setGame((prevGame) => ({ ...prevGame, [squareId]: player }));
    setPlayer((prevPlayer) => (prevPlayer === "❌" ? "⭕" : "❌"));
  };

  const renderSquares = (index) => {
    return (
      <div
        id={index}
        key={index}
        className={`${
          index === 0
            ? "rounded-tl-md"
            : index === 2
            ? "rounded-tr-md"
            : index === 6
            ? "rounded-bl-md"
            : index === 8
            ? "rounded-br-md"
            : ""
        }`}
      >
        {game[index] || ""}
      </div>
    );
  };
  return (
    <>
      <div className="w-full h-screen bg-gray-400 flex flex-col gap-5 justify-center items-center">
        <p>Giocatore: {player}</p>
        <p className={`${winner === null ? "invisible" : "block"}`}>
          {winner} Ha vinto!
        </p>
        <div
          className="grid grid-cols-3 w-72 sm:w-96 shadow-2xl rounded-md text-2xl sm:*:text-3xl *:size-24 sm:*:size-32 *:bg-gray-500 *:border *:border-gray-400 *:cursor-pointer *:flex *:justify-center *:items-center"
          onClick={handleClick}
        >
          {Array.from({ length: 9 }, (_, index) => renderSquares(index))}
        </div>
        <button
          type="button"
          className="bg-gray-700 rounded p-3 text-gray-200 shadow-xl"
          onClick={() => {
            setGame({});
            setPlayer("❌");
            setWinner(null);
          }}
        >
          Nuova Partita
        </button>
      </div>
    </>
  );
}

export default App;
