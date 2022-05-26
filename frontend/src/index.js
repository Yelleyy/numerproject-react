
import React from 'react';
import 'antd/dist/antd.min.css'
import 'antd/dist/antd.less';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line
import autoprefixer from 'autoprefixer'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
 <BrowserRouter>
    <App />
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
