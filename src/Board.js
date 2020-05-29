import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows=3, ncols=3, chanceLightStartsOn =0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let col = 0;col < ncols;col++) {
      initialBoard.push(Array.from({ length: nrows }, cell => Math.random() >= chanceLightStartsOn))

    }
    return initialBoard;
  }

  function hasWon() {
    console.log(board[0])
    for (let cell of board) {
      if (cell.includes(true)) {
        return false
      }
    }
    return true
  }

  function flipCellsAroundMe(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.slice()

      // TODO: in the copy, flip this cell and the cells around it
      let cellsToFlip = [{x, y}, {y: y-1, x}, {y: y+1, x}, {y, x: x-1}, {y, x: x+1}]

      cellsToFlip.map(cell => flipCell(cell.y, cell.x, boardCopy))
      
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You won!</div>
  }

  return (
    <table>
      <tbody>
        {board.map((row, idy) => (
        <tr>
          {row.map((cell, idx) => 
            <Cell 
              key={`${idy}-${idx}`} 
              isLit={cell} 
              flipCellsAroundMe={flipCellsAroundMe} 
              coord={`${idy}-${idx}`} 
            />
          )} 
        </tr> 
      ))}
      </tbody>
    </table>
  )
}

export default Board;