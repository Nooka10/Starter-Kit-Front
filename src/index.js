import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ThemeProvider from './components/Theme';

import './index.css';
import AuthProvider from './providers/AuthProvider';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: 'https://tweb-te2-api.herokuapp.com/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client = {client} >
    <BrowserRouter >
      <ThemeProvider >
        <AuthProvider >
          <App />
        </AuthProvider >
      </ThemeProvider >
    </BrowserRouter >
  </ApolloProvider >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
