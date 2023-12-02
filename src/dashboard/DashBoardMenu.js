import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMediaQuery } from '@mui/material';



function DashBoardMenu() {

  const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed
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
              <ul>
                <div><Link to="/">Sign out</Link></div>
                <div><Link to="/votings">Votings</Link></div>
                <div><Link to="/tutorials">Tutorials</Link></div>
                <div><Link to="/about">About</Link></div>
              </ul>
            </nav>
          </header>
        </div>
      )}
    </>
  );
}

export default   DashBoardMenu;
