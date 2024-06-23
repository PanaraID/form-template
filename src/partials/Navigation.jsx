import { useContext, useState, Fragment } from 'react'
import { Tabs } from 'react-bootstrap'
import PAGES from '../finals/PAGES'
import AppContext from '../context/AppContext'

const Navigation = () => {
  const { setPage } = useContext(AppContext)
  const [selectedTab, setSelectedTab] = useState(PAGES.HOME)

  const handleTabSelect = tab => {
    setSelectedTab(tab)
    setPage(tab)
  }

  return (
    <Fragment>
      <Tabs activeKey={selectedTab} onSelect={handleTabSelect}>
        {/* <Tabs.Tab eventKey={PAGES.HOME} title={PAGES.HOME} />
        <Tabs.Tab eventKey={PAGES.ABOUT} title={PAGES.ABOUT} />
        <Tabs.Tab eventKey={PAGES.DOCS} title={PAGES.DOCS} /> */}
        <Tabs.Tab eventKey={PAGES.DEMO} title={PAGES.DEMO} />
      </Tabs>
    </Fragment>
  )
}

export default Navigation
