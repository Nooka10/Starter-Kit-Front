import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

const {
  Provider: AuthContextProvider,
  Consumer: AuthContext
} = React.createContext();

const mutLogin = gql`
    mutation ($email: String!, $password: String!){
        login(email:$email, password:$password){
            token
        }
    }
`;

const mutSignUp = gql`
    mutation($user: UserInputAdd!){
        signUp(newUser: $user){
            token
        }
    }
`;

const queryGetMe = gql`
    query ($token: String!){
        me(token: $token){
            id
            firstname
            lastname
            email
        }
    }
`;

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,

      error: null,

      login: this.login,
      logOut: this.logOut,
      signUp: this.signUp
    };
  }

  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    // console.log('componentDidMount token = ', token);
    if (token) {
      const { client } = this.props;

      return client.query({ query: queryGetMe, variables: { token } }).then(userInfos => {
        // console.info('then componentDidMount -> user = ', userInfos.data.me);
        this.setState({
          user: userInfos.data.me,
          error: null
        });
      }).catch(err => {
        console.log('catch componentDidMount', err);
        window.localStorage.removeItem('token');
      });
    }
  }

  executeLogin = (email, password) => {
    const { client } = this.props;

    return client.mutate({ mutation: mutLogin, variables: { email, password } })
      .then(res => res.data.login.token)
      .catch(err => {
        console.log('catch executeLogin', err);
        this.setState({ user: null, error: err.toString() });
        console.log('state', this.state);
        throw err;
      });
  };

  login = async({ email, password }) => {
    return this.executeLogin(email, password).then(token => {
      // console.log('login -> token = ', token);

      const { client } = this.props;

      return client.query({ query: queryGetMe, variables: { token: token } }).then(res => {
        window.localStorage.setItem('token', token);
        this.setState({
          user: res.data.me,
          error: null
        });
      }).catch(err => {
        console.log('catch login', err);
        this.setState({ user: null, error: err.toString() });
      });
    });
  };

  executeSignUp = async(user) => {
    const { client } = this.props;

    this.setState({ user: null, error: null });
    // console.log(user);
    return client.mutate({ mutation: mutSignUp, variables: { user } })
      .then(res => res.data.signUp.token)
      .catch((err) => {
        console.log('catch executeSignUp', err);
        this.setState({ error: err.toString() });
        throw err;
      });
  };

  signUp = async(user) => {
    return this.executeSignUp(user).then(token => {
      if (this.state.error != null) {
        console.log('error is not null, abort');
      } else {
        const { client } = this.props;
        console.log(token);
        return client.query({ query: queryGetMe, variables: { token } })
          .then(res => {
            console.log(res.data.me);
            this.setState({
              user: res.data.me,
              error: null
            });

            window.localStorage.setItem('token', token);
          }).catch(err => {
            console.log('catch signUp query', err);
            this.setState({ error: err.toString() });
          });
      }
    }).catch(err => {
      console.log('catch signUp', err);
      this.setState({ error: err.toString() });
    });
  };

  logOut = () => {
    window.localStorage.removeItem('token');

    this.setState({
      user: null,
      error: null
    });
  };

  render() {
    const { children } = this.props;
    return (
      <AuthContextProvider value = {this.state} >
        {children}
      </AuthContextProvider >
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node
};

AuthProvider.defaultProps = {
  children: null
};

export { AuthContext };
export default withApollo(AuthProvider);
