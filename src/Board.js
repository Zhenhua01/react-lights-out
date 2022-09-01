import React, { useState } from "react";
import Cell from "./Cell";
import { startsOn } from "./utils";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// grid = [ [ el, el, el ],
//          [ el, el, el ],
//          [ el, el, el ],
//          [ el, el, el ],
//        ]
// 4rows x 3 cols

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // let initialBoard = [];

      // for (let x = 0; x < nrows; x++) {
    let initialBoard = Array.from({length: nrows})
        .map(row => Array.from({length: ncols})
          .map(col => startsOn(chanceLightStartsOn)));
    console.log("initialboard", initialBoard);

        // for (let y = 0; y < ncols; y++) {
        //   console.log(initialBoard);
        //   console.log("true/false", startsOn(chanceLightStartsOn))
        //   initialBoard[x] = startsOn(chanceLightStartsOn);
        //   console.log("t/f", initialBoard[x]);
        // }
      // }
      // initialBoard.push(Array.from({length: ncols})
      //     .map(startsOn(chanceLightStartsOn)));

    return initialBoard;
  }

  function hasWon() {
    for (let row of board) {
      if (row.includes(true)) {
        return false;
      }
    }
    return true;
  }
  // cell id = y-x; => [y,x] , where do we attach id/index to cells?
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  return (
    <div className="Board">
      { hasWon() &&
        <p> You Win! </p>
      }

      { !hasWon() &&
        <table>
          {
            board.map((rows, x) => {
              return rows.map((col, y) => {
                return <Cell
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                isLit={board[y][x]}/>
              })
            })
          }
        </table>
      }
    </div>
  )

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
