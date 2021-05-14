import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//Import material components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

//Import material UI icons
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

//Import external components
import Catalogue from "./components/Catalogue";
import Home from "./components/Home";
import Kpi from "./components/Kpi";
import Team from "./components/Team";

//Import styling components
import "./App.css";
const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background : 'rgba(59,64,72,0.9)',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background : '#3b4048',
    color:'white'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop:'7%',
    padding: theme.spacing(3,5),
    flex:1
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            P&SC Service Catalogue
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} style={{height:'60px', padding:10, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img src={require('./assets/images/logoWhite.png')} style={{height:'100%'}} />
          </div>
          <List>          
            <ListItem button key={1}>
                <ListItemIcon  style={{minWidth: '40px'}}>
                  <HomeOutlinedIcon style={{color:'white'}}/>
                </ListItemIcon>
                <Link className="MuiTypography-body1" to="/home" style={{color:'white',textDecoration: 'none'}}>Home</Link>
            </ListItem>
            <ListItem button key={2}>
                <ListItemIcon  style={{minWidth: '40px'}}>
                  <HomeOutlinedIcon style={{color:'white'}}/>
                </ListItemIcon>
                <Link className="MuiTypography-body1" to="/Catalogue" style={{color:'white',textDecoration: 'none'}}>Catalogue</Link>
            </ListItem>
            <ListItem button key={3}>
                <ListItemIcon  style={{minWidth: '40px'}}>
                  <HomeOutlinedIcon style={{color:'white'}}/>
                </ListItemIcon>
                <Link className="MuiTypography-body1" to="/team" style={{color:'white',textDecoration: 'none'}}>Team</Link>
            </ListItem>
            <ListItem button key={4}>
              <ListItemIcon  style={{minWidth: '40px'}}>
                <HomeOutlinedIcon style={{color:'white'}}/>
              </ListItemIcon>
              <Link className="MuiTypography-body1" to="/kpi" style={{color:'white',textDecoration: 'none'}}>KPIs</Link>
            </ListItem>
          </List>
        </Drawer>
        <Switch>
          <div className={classes.content}>
            <Route exact path="/" component={Catalogue} /> 
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/Catalogue">
              <Catalogue />
            </Route>
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/kpi">
              <Kpi />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

