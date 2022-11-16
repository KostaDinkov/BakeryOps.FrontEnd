import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import moment from 'moment/moment';

moment.updateLocale("bg",{
  months:["Януари", "Февруари","Март","Април","Май","Юни", "Юли", "Август","Септември","Октомври", "Ноември","Декември"]
})

moment.locale('bg');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
