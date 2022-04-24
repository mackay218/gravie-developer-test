import {createContext, useReducer} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './Header'
import Search from './Search'
import Checkout from './Checkout'
import {initialState, selectedGamesReducer} from './store'
import './App.css';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

export const SelectedGamesContext = createContext()

function App() {
  const [state, dispatch] = useReducer(selectedGamesReducer, initialState)
  return(
    <SelectedGamesContext.Provider value={{state, dispatch}}>
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
    </SelectedGamesContext.Provider>
  )
}

export default App;
