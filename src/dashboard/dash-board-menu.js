import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMediaQuery } from '@mui/material';
import mobileWidth from '../css-and-material/is-device';

function DashBoardMenu() {

  //breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`); 
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return(
    <>
      {isMobile ? (
        <div>
          <Button variant="contained" onClick={toggleDrawer(true)}>Open Drawer</Button><br/>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={toggleDrawer(false)}>
                <Link to="/">Sign out</Link>
              </ListItem>
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
        </div>
      ) : (
        <div>
          {/* PC version header menu */}
          <header>
            <nav>
              <ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none', padding: '0 5px' }}>
              <li><Link to="/">Sign out</Link></li>
              <li><Link to="/votings">Votings</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </header>
        </div>
      )}
    </>
  );
}

export default   DashBoardMenu;
