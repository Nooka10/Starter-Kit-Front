import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import PageHome from './routes/PageHome';
import PageLogin from './routes/PageLogin';
import PageProfile from './routes/PageProfile';
import PageSignUp from './routes/PageSignUp';

const styles = theme => ({
  root: {
    paddingTop: '64px'
  },
  appBar: {
    position: 'absolute',
    zIndex: 1900,
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 400,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: '100%'
  }
});

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render = {(params) => (
    <AuthContext >
      {({ user }) => user
                          ? <Component {...params} />
                          : <Redirect to = "/login" />}
    </AuthContext >
  )}
  />
);

class App extends React.Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute path = "/" exact component = {PageHome} />
        <Route path="/login" component={PageLogin} />
        <Route path="/sign-up" component={PageSignUp} />
        <ProtectedRoute path = "/profile/:username" component = {PageProfile} />
      </Switch>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
