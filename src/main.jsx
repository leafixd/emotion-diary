import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    //app컴포가 페이지 라우터에 필요한 모든 정보를 공급받게된다
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
)
