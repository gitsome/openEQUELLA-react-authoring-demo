import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import 'github-markdown-css/github-markdown.css';
import './App.scss';

import AppHeader from './appComponents/AppHeader/AppHeader';
import HomeRoute from './routeComponents/HomeRoute/HomeRoute';
import CourseRoute from './routeComponents/CourseRoute/CourseRoute';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    }
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App: React.FC = () => {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>

        <AppHeader />

        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <HomeRoute />
            </Route>
            <Route exact path={["/courses", "/courses/:courseId"]}>
              <CourseRoute />
            </Route>
          </Switch>
        </div>

      </div>
    </ThemeProvider>
  );
};

export default App;