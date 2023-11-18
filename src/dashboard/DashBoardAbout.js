import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMediaQuery } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import DashBoardMenu from './DashBoardMenu';



function DashBoardAbout() {
  
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

  return (
    <div>
      <DashBoardMenu/>
        <div>DashboardAbout page</div>
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
                <Link to="votings">Votings</Link>
              </ListItem>
              <ListItem button onClick={toggleDrawer(false)}>
                <Link to="tutorials">Tutorials</Link>
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
                <li><Link to="votings">Votings</Link></li>
                <li><Link to="tutorials">Tutorials</Link></li>
              </ul>
            </nav>
          </header>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default DashBoardAbout;