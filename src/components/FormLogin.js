import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitButton: {
    marginTop: 24
  },
  signUpRedirectButton: {
    marginTop: 24
  }
});

const FormLogin = ({ classes, className, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (

    <AuthContext >
      {({ error }) => {
        const handleSubmit = (e) => {
          e.preventDefault();
          onSubmit({ email, password });
        };

        return (
          <Paper className = {className} >
            <CardContent >
              <Typography variant = "h4" align = "center" >Login</Typography >
              <form className = {classes.form} onSubmit = {handleSubmit} >
                <TextField
                  type = "text"
                  label = "Email"
                  margin = "normal"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  type = "password"
                  label = "Password"
                  margin = "normal"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  required
                />
                {error == null
                 ? (
                   <br />
                 ) : (
                   <Typography color = "error" >
                     {error}
                   </Typography >
                 )
                }
                <Button
                  className = {classes.submitButton}
                  variant = "contained"
                  type = "submit"
                  color = "primary"
                >
                  Login
                </Button >
              </form >
              <Link to = "/sign-up" readOnly className = {classes.form} >
                <Button
                  className = {classes.signUpRedirectButton}
                  variant = "contained"
                  type = "submit"
                  color = "primary"
                >
                  Sign Un
                </Button >
              </Link >
            </CardContent >
          </Paper >
        );
      }}
    </AuthContext >
  );
};

FormLogin.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

FormLogin.defaultProps = {
  onSubmit: () => { },
};

export default withStyles(styles)(FormLogin);
