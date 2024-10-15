export function generateBingoCard() {
  return Array(3)
    .fill()
    .map(() => Array(3).fill(false));
};

export function findBingos(tiles) {
  let newBingoCount = 0;

  for (let row = 0; row < 3; row++) {
    if (tiles[row].every((clicked) => clicked)) {
      newBingoCount++;
    }
  }

  for (let col = 0; col < 3; col++) {
    if (tiles.every((row) => row[col])) {
      newBingoCount++;
    }
  }

  const mainDiagonal = tiles[0][0] && tiles[1][1] && tiles[2][2];
  const antiDiagonal = tiles[0][2] && tiles[1][1] && tiles[2][0];
  if (mainDiagonal) {
    newBingoCount++;
  }
  if (antiDiagonal) {
    newBingoCount++;
  }

  return { newBingoCount };
};

export const names = [
  {
    firstName: "Juan",
    lastName: " Manuel Salgado",
    position: "Argentina Rep",
    company: "Uplink ",
  },
  {
    firstName: "Alejo",
    lastName: " Miguez",
    company: "Uplink ",
    position: "Argentina Rep",
  },
  {
    firstName: "Damaris Valero",
    lastName: " Scarpa",
    company: "Uplink ",
    position: "Chief Revenue Officer",
  },
  {
    firstName: "Aldrin",
    lastName: " D' Souza",
    company: "Uplink ",
    position: "VP of Product",
  },
  {
    firstName: "Take a picture at the Photo Booth",
    lastName: "",
    company: "",
    position: "",
  },
  {
    firstName: "Breevie ",
    lastName: "",
    company: "GoGoPool ",
    position: "Head of Growth",
  },
  {
    firstName: "Budd",
    lastName: " White",
    company: "GoGoPool ",
    position: "Head of Product",
  },
  {
    firstName: "Riad",
    lastName: " Wahby",
    company: "Cubist ",
    position: "Co-Founder & CEO",
  },
  {
    firstName: "Will",
    lastName: " Dos Santos",
    company: "GoGoPool",
    position: "Creative Director",
  },
];

