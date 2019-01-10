import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import FormSignUp from '../components/FormSignUp';
import { AuthContext } from '../providers/AuthProvider';

const styles = theme => ({
  root: {
    padding: '120px 16px 16px',
  },
  form: {
    width: '100%',
    maxWidth: 360,
    margin: '0 auto',
  },
});

const PageSignUp = ({ classes, history }) => {

  return (
    <AuthContext >
      {({ signUp, user }) => {
        if (user) {
          return <Redirect to = "/" />;
        }

        const handleSubmit = async({ firstname, lastname, email, password }) => {
          console.log('submitting formValues', { firstname, lastname, email, password });
          await signUp({ firstname, lastname, email, password });
        };

        return (
          <div className = {classes.root} >
            <FormSignUp
              className = {classes.form}
              onSubmit = {handleSubmit}
            />
          </div >
        );
      }}
    </AuthContext >
  );
};

PageSignUp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.object,
};

export default withStyles(styles)(PageSignUp);
