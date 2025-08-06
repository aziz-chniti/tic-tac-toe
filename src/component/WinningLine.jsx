import { useState, useEffect } from "react";
function WinningLine({ line, winner }){
  // Determine color based on winner
  const colorClass = winner === "X" ? "bg-red-500" : "bg-green-400";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100); // delay for smooth entry
    return () => clearTimeout(timeout);
  }, []);

  const lineStyles = {
    "0,1,2": "top-[15.5%] left-0 right-0 h-1 w-full origin-left scale-x-0", // Row 1
    "3,4,5": "top-[50%] left-0 right-0 h-1 w-full origin-left scale-x-0", // Row 2
    "6,7,8": "top-[84%] left-0 right-0 h-1 w-full origin-left scale-x-0", // Row 3
    "0,3,6": "left-[15.5%] top-0 bottom-0 w-1 h-full origin-top scale-y-0", // Col 1
    "1,4,7":
      "left-[50%] translate-x-[-50%] top-0 bottom-0 w-1 h-full origin-top scale-y-0", // Col 2
    "2,5,8": "left-[84%] top-0 bottom-0 w-1 h-full origin-top scale-y-0", // Col 3
    "0,4,8": "w-[140%] h-1 top-[0%] left-[0%] rotate-45 origin-left scale-x-0", // Diagonal \
    "2,4,6":
      "w-[140%] h-1 top-[99%] left-[0.5%] -rotate-45 origin-left scale-x-0", // Diagonal /
  };

  const key = line.sort((a, b) => a - b).join(",");

  return (
    <div
      className={`absolute rounded-full transition-transform duration-500 ease-out ${colorClass} ${
        lineStyles[key]
      } ${visible ? "scale-x-100 scale-y-100" : ""}`}
    />
  );
};


export default WinningLine;