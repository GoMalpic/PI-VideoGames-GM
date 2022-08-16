import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GameIntro from './components/gameIntro/gameIntro'
import FormVideogame from './components/formVideogame/formVideogame'
import VideogameDetail from './components/videogameDetail/videogameDetail'
import Videogames from './components/videogames/videogames'
import NoFound from './components/noFound/noFound'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<GameIntro />} />
          <Route path='/home' element={<Videogames />} />
          <Route path='/game/:id' element={<VideogameDetail />} />
          <Route path='/game/add' element={<FormVideogame />} />
          <Route path='/nofound' element={<NoFound />} />
          <Route path='*' element={<Navigate replace to='/noFound' />} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;