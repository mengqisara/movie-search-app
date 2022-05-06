import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import 'antd/dist/antd.css';
import MovieSinglePage from './pages/MovieSinglePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import ActorsPage from './pages/ActorsPage';
import PopularMovie from './pages/PopularMovie';
import ActorSinglePage from './pages/ActorSinglePage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/movies" render={() => <MoviesPage />} />
        <Route exact path="/actors" render={() => <ActorsPage />} />
        <Route
          exact
          path="/movies=:nconst"
          render={() => <MovieSinglePage />}
        />
        <Route
          exact
          path="/actors=:tconst"
          render={() => <ActorSinglePage />}
        />
        <Route exact path="/popularmovie" render={() => <PopularMovie />} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);
