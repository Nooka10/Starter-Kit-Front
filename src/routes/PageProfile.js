import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import AppBar from '../components/AppBar';
import PostCard from '../components/PostCard';
import ProfileHeader from '../components/ProfileHeader';
import { AuthContext } from '../providers/AuthProvider';

const styles = theme => ({
  root: {},
  main: {
    width: '100%',
    maxWidth: theme.layout.contentMaxWidth,
    margin: '0 auto',
    padding: 24,
  },
  header: {
    marginBottom: 24,
  }
});

const PageProfile = ({ classes }) => (
  <AuthContext >
    {({ user }) => {
      return (
        <div className = {classes.root} >
          <AppBar />
          <div className = {classes.main} >
            <ProfileHeader
              className = {classes.header}
              displayName = {user.firstname + ' ' + user.lastname}
              bio = "Professional photographer"
              coverUrl = "https://source.unsplash.com/collection/841904"
              avatarUrl = "https://source.unsplash.com/collection/895539"
              stats = {{
                posts: 112,
                followers: 234,
                following: 22
              }}
            />

            <Grid container spacing = {24} >
              {user.watchList.map(movie => {
                  return (
                    <Grid item xs = {12} sm = {6} md = {4} >
                      <PostCard
                        className = {classes.post}
                        title = {movie.title}
                        releaseDate = {movie.release_date}
                        imageUrl = {'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                        avatarUrl = {'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                        overview = {movie.overview}
                      />
                    </Grid >
                  );
                }
              )}
            </Grid >
          </div >
        </div >
      );
    }}
  </AuthContext >
);

PageProfile.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(styles)(PageProfile);
