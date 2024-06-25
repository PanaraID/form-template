import { useContext, Fragment } from "react";
import { Tabs } from "react-bootstrap";
import PAGES from "../finals/PAGES";
import AppContext from "../context/AppContext";

const Navigation = () => {
  const { page, setPage } = useContext(AppContext);

  const handleTabSelect = (tab) => setPage(tab);

  return (
    <Fragment>
      <Tabs activeKey={page} onSelect={handleTabSelect}>
        <Tabs.Tab eventKey={PAGES.HOME} title={PAGES.HOME} />
        {/* <Tabs.Tab eventKey={PAGES.ABOUT} title={PAGES.ABOUT} /> */}
        <Tabs.Tab eventKey={PAGES.DOCS} title={PAGES.DOCS} />
        <Tabs.Tab eventKey={PAGES.DEMO} title={PAGES.DEMO} />
      </Tabs>
    </Fragment>
  );
};

export default Navigation;
