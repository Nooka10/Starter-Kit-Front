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
    marginTop: 24,
  },
  signUpRedirectButton: {
    marginTop: 24
  }
});

const FormSignUp = ({ classes, className, onSubmit }) => {

  const [values, setValues] = useState({
    firstname: 'Benoît',
    lastname: 'Schop',
    email: 'a@a.ch',
    password: 'abcd1234',
    passwordConfirm: 'abcd1234',
    error: null
  });

  const handleChange = key => e => {
    setValues({ ...values, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== values.passwordConfirm) {
      setValues({ error: 'The entered passwords are not identicals!' });
    } else {
      onSubmit(values);
    }
  };

  return (
    <AuthContext >
      {({ error }) => {
        return (
          <Paper className = {className} >
            <CardContent >
              <Typography variant = "h4" align = "center" >Sign Up</Typography >
              <form className = {classes.form} onSubmit = {handleSubmit} >
                <TextField
                  type = "text"
                  label = "Email"
                  margin = "normal"
                  value = {values.email}
                  onChange = {handleChange('email')}
                  required
                />
                <TextField
                  type = "text"
                  label = "Firstname"
                  margin = "normal"
                  value = {values.firstname}
                  onChange = {handleChange('firstname')}
                  required
                />
                <TextField
                  type = "text"
                  label = "Lastname"
                  margin = "normal"
                  value = {values.lastname}
                  onChange = {handleChange('lastname')}
                  required
                />
                <TextField
                  type = "password"
                  label = "Password"
                  margin = "normal"
                  value = {values.password}
                  onChange = {handleChange('password')}
                  required
                />
                <TextField
                  type = "password"
                  label = "Confirm password"
                  margin = "normal"
                  value = {values.passwordConfirm}
                  onChange = {handleChange('passwordConfirm')}
                  required
                />
                {error == null
                 ? (<br />)
                 : (
                   <Typography color = "error" >
                     {error}
                   </Typography >
                 )
                }
                {values.error == null
                 ? (<br />)
                 : (
                   <Typography color = "error" >
                     {values.error}
                   </Typography >
                 )
                }

                <Button
                  className = {classes.submitButton}
                  variant = "contained"
                  type = "submit"
                  color = "primary"
                >
                  Sign Up
                </Button >
              </form >
              <Link to = "/login" readOnly className = {classes.form} >
                <Button
                  className = {classes.signUpRedirectButton}
                  variant = "contained"
                  type = "submit"
                  color = "primary"
                >
                  Login
                </Button >
              </Link >
            </CardContent >
          </Paper >);
      }}
    </AuthContext >
  );
};

FormSignUp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  onSubmit: PropTypes.func
};

FormSignUp.defaultProps = {
  onSubmit: () => {}
};

export default withStyles(styles)(FormSignUp);
