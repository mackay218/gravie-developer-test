import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Header'
import Search from './Search'
import Checkout from './Checkout'
import { Link } from "react-router-dom";

import './App.css';


function App() {
  return(
    <div className="App">
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Search/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
        </Router>
    </div>
  
  )
}

export default App;
