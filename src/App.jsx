import { useState } from 'react';
import Home from './pages/Home';
import logo from './logo.svg';
import './App.css';
// import demo from './demo.graphql';

if (import.meta) {
    console.log(
        'import.meta',
        import.meta
    );
    console.log(
        'import.meta.env.VITE_APP_BASEAPI=',
        import.meta.env.VITE_APP_BASEAPI
    );
    // console.log(
    //     '  import.meta.env.VITE_SOME_KEY==',
    //     import.meta.env.VITE_APP_BASEAPI
    // );
}
// asdsdf 
function App() {
    const [count, setCount] = useState(0);

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
            <Home/>
        </div>
    );
}

// if (import.meta.hot) {
//     import.meta.hot.accept((newModule) => {
//         console.log('代码更新成功');
//     });
// }

export default App;
