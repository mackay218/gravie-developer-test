import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Link } from '@mui/material';
import { Link as RouterLink} from "react-router-dom";

function Header(){
    const [ isOpen, setIsOpen] = useState(false)
  return (

      <div >
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>{setIsOpen(!isOpen)}}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Game Rental
            </Typography>
          </Toolbar>
          <Drawer anchor={'left'} open={isOpen} onClose={() => {setIsOpen(false)}} >
            <div className="sideNavContent">
              <div className="sideNavItem navHeader">Navigation</div>
              <span/>
              <div className="sideNavItem">
                <Link component={RouterLink} to="/search" onClick={() => {setIsOpen(false)}}>Search</Link>
              </div>
              <div className="sideNavItem">
                <Link component={RouterLink} to="/checkout" onClick={() => {setIsOpen(false)}}>Checkout</Link>
              </div>
            </div>
          </Drawer>
        </AppBar>
      </div>
  )
}
export default Header;