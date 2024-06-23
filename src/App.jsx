import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import AppContext from "./context/AppContext";
import PAGES from "./finals/PAGES";

import { Card } from "react-bootstrap";

import Navigation from "./partials/Navigation";

import Home from "./pages/Home";
import About from "./pages/About";
import Docs from "./pages/Docs";
import Demo from "./pages/Demo";

function App() {
  const [page, setPage] = useState(PAGES.DEMO);

  const context = {
    page,
    setPage,
  };
  return (
    <AppContext.Provider value={context}>
      <Card className="m-2">
        <Card.Header>
          <Navigation />
        </Card.Header>
        <Card.Body>
          {page === PAGES.HOME && <Home />}
          {page === PAGES.ABOUT && <About />}
          {page === PAGES.DOCS && <Docs />}
          {page === PAGES.DEMO && <Demo />}
        </Card.Body>
      </Card>
    </AppContext.Provider>
  );
}

export default App;
