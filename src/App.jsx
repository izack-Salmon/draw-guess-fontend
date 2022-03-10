
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/scss/global.scss';
import { AppHeader } from './cmps/AppHeader';
import { Drawing } from './views/Drawing';
import { Home } from './views/Home';
import { Guessing } from './views/Guessing';
import { WordChoosing } from './views/WordChoosing';
import { Wait } from './views/Waiting';

function App() {
  return (
    <Router>
      < div className="App" >
        <AppHeader />
        <main className='main-layout'>
          <Routes>
            <Route element={<Drawing />} path='/drawing' />
            <Route element={<Guessing />} path='/guessing' />
            <Route element={<WordChoosing />} path='/word-choosing' />
            <Route element={<Wait />} path='/wait' />
            <Route element={<Home />} path='/' />
          </Routes>
        </main>
      </div >
    </Router>
  );
}

export default App;
