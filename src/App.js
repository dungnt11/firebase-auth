import React from 'react';
import 'antd/dist/antd.css';
// import { Counter } from './features/counter/Counter';
import { Register } from './features/register';
import { Login } from './features/login';

function App() {
  return (
    <div className="App">
        {/* <Counter /> */}
        <Register />
        <Login />
    </div>
  );
}

export default App;
