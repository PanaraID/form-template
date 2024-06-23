import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Alert, ListGroup } from "react-bootstrap";

const PAGES = {
  PENDAHULUAN: "Pendahuluan",
  PERSIAPAN: "Persiapan",
  SCRIPT_FORM: "Mengenai Script pada Form",
  SCRIPT_SPREADSHEET: "Mengenai Script pada Spreadsheet",
  HAL_PENTING_SAAT_KUSTOM_FORM: "Hal yang Penting Saat Kustom Form",
  KUSTOM_FORM: "Kustom Form"
};

const Docs = () => {
  const [page, setPage] = useState(() => localStorage.getItem('page'));

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  return (
    <Fragment>
      <h1>Docs</h1>
      <Alert variant="info">
        <p>Mengenai cara menggunakan script</p>
        <p>Mohon tunggu update selanjutnya</p>
      </Alert>
      <ListGroup as="ol" id="list" numbered>
        {Object.keys(PAGES).map((key) => {
          const id = key.toLowerCase().replace(" ", "-");
          return (
            <ListGroup.Item
              key={id}
              as="li"
              onClick={() => setPage(PAGES[key])}
              active={page === PAGES[key]}
            >
              {PAGES[key]}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {page === PAGES.PERSIAPAN && <h1>Hello World</h1>}
    </Fragment>
  );
};

export default Docs;
