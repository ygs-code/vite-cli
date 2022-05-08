import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import demo from './demo.graphql';

let c = 123;

function App() {
    const [count, setCount] = useState(0);

    console.log('count123==', count);
    // console.log('demo==', demo()); 
    /*eslint-disable*/
    console.log('env', import.meta.env.VITE_APP_BASEAPI);
    console.log('env', import.meta.env.VITE_SOME_KEY);
    /*eslint-disable*/

    // 注入全局变量打包出错
    // console.log(
    //     '  import.meta.env.VITE_SOME_KEY==',
    //     import.meta.env.VITE_SOME_KEY
    // );

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button
                        type="button"
                        onClick={() => setCount((count) => count + 1)}
                    >
                        count is: {count}
                    </button>
                </p>
                <p>
                    Edit <code>App.jsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
}

if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        console.log('代码更新成功');
    });
}

export default App;
