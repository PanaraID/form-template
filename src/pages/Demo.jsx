import { useState } from "react";
// import { useEffect } from "react";
import { Fragment } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import TEMLATES from "../finals/TEMPLATES";
import Iframe from "../partials/Iframe";

const Demo = () => {
  const [page, setPage] = useState();

  // useEffect(() => {
  //   localStorage.setItem("page_demo", JSON.stringify(page));
  // }, [page]);

  const copyMe = (code, alert_text) => {
    fetch(code)
      .then((e) => e.text())
      .then((e) => {
        console.log(e);
        navigator.clipboard.writeText(e);
        alert(alert_text);
      });
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <h3>Demonstrasi</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup as="ol" id="list" numbered>
            {Object.keys(TEMLATES).map((key) => {
              const id = key.toLowerCase().replace(" ", "-");
              console.log(key);
              return (
                <ListGroup.Item
                  key={id}
                  as="li"
                  onClick={() => setPage(TEMLATES[key])}
                  active={page && page["name"] === TEMLATES[key]["name"]}
                >
                  {TEMLATES[key]["name"]}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
      <section className="border m-2 p-2">
        <Card>
          <Card.Header>
            <h3>{page ? page["name"] : "-"}</h3>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroupItem>
                <Card>
                  <Card.Header>Deskripsi</Card.Header>
                  <Card.Body>{page ? page["description"] : "-"}</Card.Body>
                </Card>
              </ListGroupItem>
              <ListGroupItem>
                <Card>
                  <Card.Header>Script Spreadsheet</Card.Header>
                  <Card.Body>
                    {page ? (
                      <Button
                        onClick={() =>
                          copyMe(
                            `./scripts/${page["script_spreadsheet"]}.gs`,
                            "Script Spreadsheet Berhasil Disalin!"
                          )
                        }
                      >
                        Salin Saya
                      </Button>
                    ) : (
                      "-"
                    )}
                  </Card.Body>
                </Card>
              </ListGroupItem>
              <ListGroupItem>
                <Card>
                  <Card.Header>Script HTML</Card.Header>
                  <Card.Body>
                    {page ? (
                      <Button
                        onClick={() =>
                          copyMe(
                            `./templates/${page["path"]}.html`,
                            "Script HTML Berhasil Disalin!"
                          )
                        }
                      >
                        Salin Saya
                      </Button>
                    ) : (
                      "-"
                    )}
                  </Card.Body>
                </Card>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
        {page && <Iframe src={page["path"]} />}
      </section>
    </Fragment>
  );
};

export default Demo;
