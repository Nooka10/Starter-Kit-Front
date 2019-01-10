import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import FormLogin from '../components/FormLogin';
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

const PageLogin = ({ classes, history }) =>
  (
    <AuthContext >
      {({ login, error, user }) => {
        if (user) {
          return <Redirect to = "/" />;
        }

        const handleSubmit = async(values) => {
          try {
            console.log('submitting formValues', values);
            await login(values);
          } catch (err) {
            // FIXME: gérer l'erreur... et l'afficher dans le Form...
          }
          history.push('/');
        };

        return (
          <div className = {classes.root} >
            <FormLogin
              className = {classes.form}
              onSubmit = {handleSubmit}
            />
          </div >
        );
      }}
    </AuthContext >
  );

PageLogin.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.object,
};

export default withStyles(styles)(PageLogin);
