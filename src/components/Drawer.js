import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../actions/logoutAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: "black"
    },
    appBar: {
      backgroundColor: "black",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbar: {
      backgroundColor: "black",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      backgroundColor: "black",
      flexGrow: 1,
      padding: theme.spacing(3, 3, 0, 3),
    },
    bottomMenu: {
      backgroundColor: "black",
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `black`
    },
  }),
);

export default function MiniDrawer({children}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  const [value, setValue] = React.useState('');
  
  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setValue(newValue);
  };
  const adminNavLinks = [
    { title: `admins`, path: `/dashboard-admins`, Icon: <SupervisedUserCircleIcon color="secondary"/> },
    { title: `categories`, path: `/dashboard-categories`, Icon: <CategoryIcon color="secondary"/> },
    { title: `clients`, path: `/dashboard-clients`, Icon: <SupervisorAccountIcon color="secondary"/> },
  ];
  useEffect(() => {
    adminNavLinks.map((link) => {
      if(link.path.localeCompare(history.location.pathname) === 0){
        setValue(link.title)
      }
    })
    if("/dashboard-products".localeCompare(history.location.pathname) === 0)
      setValue("products")
    if("/profile".localeCompare(history.location.pathname) === 0)
      setValue("profile")
  },[])
  console.log("userType", user.userType);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton edge="start" color="secondary" aria-label="home" onClick={() => history.push("/")}>
            <Typography variant="h6" noWrap>
              website name
            </Typography>
          </IconButton>
          
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <BottomNavigation value={value} onChange={handleChange} className={classes.bottomMenu}>
          {user.userType === "ADMIN" && isAuthenticated &&
            adminNavLinks.map(({ title, path, Icon }) => (
                <BottomNavigationAction key={title} label={title} value={title} icon={<Link to={path} key={title} className={classes.linkText}>{Icon}</Link>} /> 
          ))}
          {isAuthenticated &&
              <BottomNavigationAction label="products" value="products" icon={<Link to={"/dashboard-products"} className={classes.linkText}><HorizontalSplitIcon color="secondary"/></Link>} />
          }
          {isAuthenticated &&
              <BottomNavigationAction label="profile" value="profile" icon={<Link to={"/profile"} className={classes.linkText}><AccountCircleIcon color="secondary"/></Link>} />
          } 
          {isAuthenticated &&
              <BottomNavigationAction label="Logout" value="Logout" icon={<ExitToAppIcon onClick={() => {dispatch(startLogout())}} color="secondary"/>} />
          }
          {!isAuthenticated &&
              <BottomNavigationAction label="login" value="login" icon={<Link to={"/login"} className={classes.linkText}><PeopleOutlineIcon color="secondary"/></Link>} />
          }
        </BottomNavigation>
      </main>
    </div>
  );
}
