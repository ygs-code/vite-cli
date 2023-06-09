/*
 * @Date: 2022-05-09 09:42:27
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-16 19:02:44
 * @FilePath: /vite-cli/src/App.jsx
 * @Description:
 */
import React, { useState } from 'react';
import viteLogo from './favicon.svg';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
//  asf 
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank"  rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank"  rel="noopener noreferrer">
                   <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
                 Edit <code>src/App.jsx</code> and save to test HMR 
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
