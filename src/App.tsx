import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // const dx = [ 0, 0, 1, -1 ];
  // const dy = [ 1, -1, 0, 0 ];

  const [board, setBoard] = useState<number[][]>([[], [], []]);
  const [vis, setVis] = useState<number[][]>([[], [], []]);
  const SIZE = 3;

  let my_turn : number; // 0 or 1
  const decideTurn = () => { return Math.random(); }

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    my_turn = decideTurn();

    for (let i = 0; i < SIZE; ++i) {
      for (let j = 0; j < SIZE; ++j) {
        board[i][j] = 0;
      }
    }
  }

  const a = (n : number) => {
    n--;

    const i = Math.floor(n / SIZE);
    const j = Math.floor(n % SIZE);

    my_turn ^= 1; // swich.

    console.log(i, j, (my_turn) ? 'o' : 'x');
  }

  let count = 0;

  const copyMemory = (src: number[][], dest: number[][]) => {
    for (let i = 0; i < SIZE; ++i) {
      for (let j = 0; j < SIZE; ++j) {
        dest[i][j] = src[i][j];
      }
    }
  }

  const tracking = (k: number) : void => { // E : 9!
    if (k === 9) { count++; return; }

    // const copy: number[][] = [[], [], []];
    // copyMemory(board, copy);

    for (let i = 0; i < SIZE * SIZE; ++i) {
      const index1 = Math.floor(i / SIZE);
      const index2 = Math.floor(i % SIZE);

      if (board[index1][index2] !== 0) continue;
      
      board[index1][index2] = 1;
      // console.log(k, ':', board[0][0], board[0][1], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]);
      tracking(k + 1);
      board[index1][index2] = 0;
    }
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
            <td id="1" onClick={() => {a(1)}}> 1 </td>
            <td id="2" onClick={() => {a(2)}}> 2 </td>
            <td id="3" onClick={() => {a(3)}}> 3 </td>
        </tr>
        <tr>
            <td id="4" onClick={() => {a(4)}}> 4 </td>
            <td id="5" onClick={() => {a(5)}}> 5 </td>
            <td id="6" onClick={() => {a(6)}}> 6 </td>
        </tr>
        <tr>
            <td id="7" onClick={() => {a(7)}}> 7 </td>
            <td id="8" onClick={() => {a(8)}}> 8 </td>
            <td id="9" onClick={() => {a(9)}}> 9 </td>
        </tr>
        </tbody>
        <button onClick={() => {tracking(0); console.log(count); count = 0; }}> b </button>
    </table>

  );
}

export default App;
