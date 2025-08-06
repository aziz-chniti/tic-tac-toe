import { useState, useEffect } from "react";
import WinningLine from "./component/WinningLine.jsx";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { winner, line } = calculateWinner(board);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const GetStatus = () => {
    return winner
      ? `🎉 Winner: ${winner}`
      : board.every(Boolean)
      ? "It's a draw!"
      : `Next: ${xIsNext ? "X" : "O"}`;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <button
      onClick={() => handleClick(index)}
      className="w-24 h-24 md:w-28 md:h-28 text-5xl md:text-6xl font-extrabold border border-gray-400 dark:border-gray-600 flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <span
        className={`transition-all duration-300 ${
          board[index] === "X" ? "text-red-500" : "text-green-400"
        }`}
      >
        {board[index]}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-xl shadow-md hover:scale-110 active:scale-90 transition-transform"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Tic Tac Toe
      </h1>

      <div className="relative grid grid-cols-3 gap-2">
        {board.map((_, idx) => renderSquare(idx))}

        {winner && line && <WinningLine line={line} winner={winner} />}
      </div>

      <p className="mt-4 text-xl text-gray-800 dark:text-gray-200">
        {<GetStatus/>}
      </p>

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Restart
      </button>
    </div>
  );
};

// Helper function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // col 1
    [1, 4, 7], // col 2
    [2, 5, 8], // col 3
    [0, 4, 8], // diagonal \
    [2, 4, 6], // diagonal /
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }; // return both
    }
  }

  return { winner: null, line: null };
}



export default App;
