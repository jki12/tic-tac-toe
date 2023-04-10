import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const SIZE = 3;

function App() {
  const tds = document.getElementsByTagName('td');
  const boardRef = useRef<number[]>([]);
  const copyRef = useRef<number[]>([]);
  const notationRef = useRef<number[]>([]); // 컴퓨터가 찾은 최선의 수..
  const turnRef = useRef<number>(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    turnRef.current = 0;

    for (let i = 0; i < SIZE * SIZE; ++i) {
      boardRef.current[i] = -1;
      copyRef.current[i] = -1;
    }
  }

  const isComputerTurn = () => {
    return (turnRef.current % 2 === 0);
  }

  const place = (index : number) => {
    if (boardRef.current[index] !== 0) return;

    boardRef.current[index] = turnRef.current;
    copyRef.current[index] = turnRef.current;
    tds[index].innerText = (isComputerTurn() ? "X" : "O"); // change to image.

    turnRef.current++;

    console.log( boardRef.current );
  }

  /**
   * 
   * @returns point, lose : -1, draw : 0, win : 1
   */
  const determineGameResult = (board : number[]) => {
    const winnigCondition : number[][] = [
      // column
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // row
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      //diagonal
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winnigCondition.length; ++i) {
      const [i1, i2, i3] = winnigCondition[i];

      if (board[i1] !== 0 && board[i1] === board[i2] && board[i1] === board[i3]) {
        return (board[i1] % 2 === 1) ? 1 : -1;
      }
    }

    return 0;
  }

  const tracking = (k: number) : void => {
    if (k === 9) {
      if (determineGameResult(copyRef.current) === -1) { alert("something was wrong.."); return; }

      // console.log(copyRef.current);
      notationRef.current = copyRef.current.slice();
      
      return;
    }

    for (let i = 0; i < SIZE * SIZE; ++i) {
      if (copyRef.current[i] !== 0) continue;
      
      copyRef.current[i] = k;
      const gameResult = determineGameResult(copyRef.current);

      if (gameResult === -1) { // 지는 수는 고려 안함.
        copyRef.current[i] = 0;

        continue;
      }
      
      tracking(k + 1);

      copyRef.current[i] = 0;
    }
  }

  const test = (index : number) => {
    place(index);

    // console.log(turnRef.current);
    tracking(turnRef.current);

    
    console.log(notationRef.current);
    console.log("find best way = ", notationRef.current[turnRef.current]);
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
            <td id="0" onClick={() => { test(0); }}> 0 </td>
            <td id="1" onClick={() => { test(1); }}> 0 </td>
            <td id="2" onClick={() => { test(2); }}> 0 </td>
        </tr>
        <tr>
            <td id="3" onClick={() => { test(3); }}> 0 </td>
            <td id="4" onClick={() => { test(4); }}> 0 </td>
            <td id="5" onClick={() => { test(5); }}> 0 </td>
        </tr>
        <tr>
            <td id="6" onClick={() => { test(6); }}> 0 </td>
            <td id="7" onClick={() => { test(7); }}> 0 </td>
            <td id="8" onClick={() => { test(8); }}> 0 </td>
        </tr>
        </tbody>
    </table>

  );
}

export default App;
