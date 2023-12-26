import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useMediaQuery } from '@mui/material'
import mobileWidth from '../css-and-material/is-device'
import { styles02 } from '../css-and-material/styles-02'

function DashBoardHeader() {
  // breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setIsDrawerOpen(open)
  }

  return (
    <div style={styles02.innerHeaderContainer}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '50px' }}>LO</div>
        <div>
          {isMobile ? (
            <div>
              {/* mobile version header menu */}
              <nav>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button onClick={toggleDrawer(true)}>III</Button>
                </div>
                <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                  <List>
                    <ListItem button onClick={toggleDrawer(false)}>
                      <Link to="/votings">Votings</Link>
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                      <Link to="/tutorials">Tutorials</Link>
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                      <Link to="/about">About</Link>
                    </ListItem>
                  </List>
                </Drawer>
              </nav>
            </div>
          ) : (
            <div>
              {/* PC version header menu */}
              <nav>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '250px'
                  }}
                >
                  <Link to="/votings">Votings</Link>
                  <Link to="/tutorials">Tutorials</Link>
                  <Link to="/about">About</Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flexEnd' }}>
        <div style={{ marginRight: '8px' }}>
          <Link to="/">Sign out</Link>
        </div>
        <div>User</div>
      </div>
    </div>
  )
}

export default DashBoardHeader
