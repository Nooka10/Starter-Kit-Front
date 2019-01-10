import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import { AuthContext } from '../providers/AuthProvider';

const styles = theme => ({
  post: {
    marginBottom: theme.spacing.unit * 2,
  }
});

const PageHome = ({ classes }) => (
  <AuthContext >
    {({ user }) => {
      return (
        <Layout
          aside = {
            <ProfileCard
              displayName = {user.firstname + ' ' + user.lastname}
              email = {user.email}
              avatarUrl = "https://source.unsplash.com/collection/895539"
              profileUrl = {'/profile/' + user.email}
              coverUrl = "https://source.unsplash.com/collection/841904"
              stats = {{
                posts: 112,
                followers: 234,
                following: 22
              }}
            />
          }
        >
          {user.watchList.map(movie => {
              return (<PostCard
                className = {classes.post}
                title = {movie.title}
                releaseDate = {movie.release_date}
                imageUrl = {'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                avatarUrl = {'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                overview = {movie.overview}
              />);
            }
          )
          }
        </Layout >
      );
    }}
  </AuthContext >
);

PageHome.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string)
};

export default withStyles(styles)(PageHome);
