import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'

import AppContext from './context/AppContext'
import PAGES from './finals/PAGES'

import Home from './pages/Home'
import About from './pages/About'
import Docs from './pages/Docs'

function App() {
  const [page, setPage] = useState(PAGES.HOME)

  const context = {
    page, setPage
  }
  return (
    <AppContext.Provider value={context}>
      {page === PAGES.HOME && <Home />}
      {page === PAGES.ABOUT && <About />}
      {page === PAGES.Docs && <Docs />}
    </AppContext.Provider>
  )
}

export default App
