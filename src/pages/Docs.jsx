import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Alert, Card, ListGroup } from "react-bootstrap";
import Pendahuluan from "./docs/Pendahuluan";
import Persiapan from "./docs/Persiapan";
import KustomForm from "./docs/KustomForm";

const PAGES = {
  PENDAHULUAN: "Pendahuluan",
  PERSIAPAN: "Persiapan",
  SCRIPT_FORM: "Mengenai Script pada Form",
  SCRIPT_SPREADSHEET: "Mengenai Script pada Spreadsheet",
  HAL_PENTING_SAAT_KUSTOM_FORM: "Hal yang Penting Saat Kustom Form",
  KUSTOM_FORM: "Kustom Form",
};

const Docs = () => {
  const [page, setPage] = useState();

  useEffect(() => {
    localStorage.setItem("page", page);
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
      <Card className="m-2 p-2">
        {page === PAGES.PENDAHULUAN && <Pendahuluan />}
        {page === PAGES.PERSIAPAN && <Persiapan />}
        {page === PAGES.KUSTOM_FORM && <KustomForm />}
      </Card>
    </Fragment>
  );
};

export default Docs;
