import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const SIZE = 3;

function App() {
  const boardRef = useRef<number[]>([]);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState<boolean>();
  let count = 0;

  const decideTurn = () => {
    return (Math.random() === 0);
  }

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setIsPlayerOneTurn(decideTurn());

    for (let i = 0; i < SIZE * SIZE; ++i) {
      boardRef.current[i] = 0;
    }
  }

  const to2dIndex = (index : number) => {
    const i = Math.floor(index / SIZE);
    const j = Math.floor(index % SIZE);

    console.log(i, j);
  }

  const place = (index : number) => {
    if (boardRef.current[index] !== 0) return;

    boardRef.current[index] = (isPlayerOneTurn) ? 1 : 2;
    setIsPlayerOneTurn(!isPlayerOneTurn); // toggle.
  }

  // lose : -1, draw : 0, win : 1
  const determineGameResult = () => { // check return type.
    const winnigCondition : number[][] = [
      // col
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // row
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      //diag
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winnigCondition.length; ++i) {
      if (boardRef.current[winnigCondition[i][0]] !== 1 && boardRef.current[winnigCondition[i][0]] === boardRef.current[winnigCondition[i][1]] && boardRef.current[winnigCondition[i][1]] === boardRef.current[winnigCondition[i][2]]) return 1;
      else if (boardRef.current[winnigCondition[i][0]] !== 2 && boardRef.current[winnigCondition[i][0]] === boardRef.current[winnigCondition[i][1]] && boardRef.current[winnigCondition[i][1]] === boardRef.current[winnigCondition[i][2]]) return -1;
    }

    return 0;
  }

  const tracking = (k: number, isMyTurn :boolean) : void => {
    if (k === 9) {
      count++;

      return;
    }

    for (let i = 0; i < SIZE * SIZE; ++i) {
      if (boardRef.current[i] !== 0) continue;
      
      boardRef.current[i] = (isMyTurn ? 1 : 2);
      const gameResult = determineGameResult();

      if (gameResult === -1) { // 지는 수는 고려 안함.
        boardRef.current[i] = 0;

        return;
      }
      else if (gameResult === 1) {
        boardRef.current[i] = 0;

        // :)

        return;
      }

      tracking(k + 1, !isMyTurn);
      boardRef.current[i] = 0;
    }

    if (k === 0) return;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
          </th>
          <th>
            <h3> tic tac toe! </h3>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td id="0" onClick={() => {place(0); console.log(boardRef.current[0]); console.log(determineGameResult())}}> 1 </td>
            <td id="1" onClick={() => {place(1); console.log(boardRef.current[1]); console.log(determineGameResult())}}> 2 </td>
            <td id="2" onClick={() => {place(2); console.log(boardRef.current[2]); console.log(determineGameResult())}}> 3 </td>
        </tr>
        <tr>
            <td id="3" onClick={() => {place(3); console.log(boardRef.current[3]); console.log(determineGameResult())}}> 4 </td>
            <td id="4" onClick={() => {place(4); console.log(boardRef.current[4]); console.log(determineGameResult())}}> 5 </td>
            <td id="5" onClick={() => {place(5); console.log(boardRef.current[5]); console.log(determineGameResult())}}> 6 </td>
        </tr>
        <tr>
            <td id="6" onClick={() => {place(6); console.log(boardRef.current[6]); console.log(determineGameResult())}}> 7 </td>
            <td id="7" onClick={() => {place(7); console.log(boardRef.current[7]); console.log(determineGameResult())}}> 8 </td>
            <td id="8" onClick={() => {place(8); console.log(boardRef.current[8]); console.log(determineGameResult())}}> 9 </td>
        </tr>
        </tbody>
        <button onClick={() => {tracking(0, true); console.log(count); count = 0; }}> b </button>
    </table>

  );
}

export default App;
