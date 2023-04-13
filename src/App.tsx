import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const SIZE = 3;
const EMPTY = 0;

const COM_MARK = 1;
const USER_MARK = 2;

const test_case1 = [ 2, 2, 0, 1, 0, 0, 0, 0, 0 ]; // 기댓값 = index 2 - 1, defense.
const test_case2 = [ 2, 0, 0, 1, 1, 0, 2, 0, 2 ]; // 기댓값 = index 5 - 1, offense.

type a =  { // rename.
  gameResult: number
  notation: number[] // 기보.
  log: number[] // stack.
}

function App() {
  const tds = document.getElementsByTagName('td');
  const boardRef = useRef<number[]>([]);
  const notationRef = useRef<[number, number[], number[]]>([0, [], []]);
  const turnRef = useRef<number>(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    turnRef.current = 0;
    notationRef.current[0] = -1; // score.

    for (let i = 0; i < SIZE * SIZE; ++i) {
      boardRef.current[i] = EMPTY;

      notationRef.current[1][i] = 0;
      notationRef.current[2][i] = EMPTY;
    }
  }

  const isComputerTurn = () => {
    return (turnRef.current % 2 === 1);
  }

  const place = (index : number) => {
    if (boardRef.current[index] !== EMPTY) return;

    boardRef.current[index] = turnRef.current;
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

      if (board[i1] !== EMPTY && board[i1] === board[i2] && board[i1] === board[i3]) {
        return (board[i1] === COM_MARK) ? 1 : -1;
      }
    }

    return 0;
  }

  const copy = (src: number[], dest: number[]) => {
    if (src.length > dest.length) return;

    for (let i = 0; i < dest.length; ++i) {
      dest[i] = src[i];
    }
  }

  const tracking = (k: number) : void => {
    // console.log('call');
    if (k === 9) {
      // if (determineGameResult(copyRef.current) === -1) { alert("something was wrong.."); return; }

      console.log(notationRef.current[2], determineGameResult(notationRef.current[2]));
      return;
    }

    for (let i = 0; i < SIZE * SIZE; ++i) {
      // if (test_case2[i] !== 0) continue;
      if (notationRef.current[2][i] !== EMPTY) continue;
      
      // test_case2[i] = (k % 2 === 1) ? COM_MARK : USER_MARK;
      notationRef.current[1][i] = k;
      notationRef.current[2][i] = (k % 2 === 1) ? COM_MARK : USER_MARK;

      const gameResult = determineGameResult(notationRef.current[2]);

      // console.log(test_case1, gameResult);

      if (gameResult === -1 || notationRef.current[0] >= gameResult) { // 지거나 현재 예측한 결과 보다 안 좋은 수는 고려 안함. notationRef.current[0] > gameResult
        notationRef.current[1][i] = 0;
        notationRef.current[2][i] = 0;
        // test_case2[i] = 0;

        continue;
      }
      
      tracking(k + 1);

      notationRef.current[1][i] = 0;
      notationRef.current[2][i] = 0;
    }
  }

  const test = (index : number) => {
    place(index);

    // copyRef.current = [...boardRef.current];
    tracking(turnRef.current);

    
    
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
            <td id="0" onClick={() => { console.log(test_case2); tracking(5) }}> 0 </td>
            <td id="1" onClick={() => { console.log(notationRef.current); }}> 0 </td>
            <td id="2" onClick={() => { copy(test_case2, notationRef.current[2]); console.log(test_case2, notationRef.current[2]); tracking(5); }}> 0 </td>
        </tr>
        <tr>
            <td id="3" onClick={() => { copy(test_case1, notationRef.current[2]); console.log(test_case1, notationRef.current[2]); tracking(3); }}> 0 </td>
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
