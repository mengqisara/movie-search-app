import config from './config.json';

const getActorSearch = async (name, birthyear, deathyear) => {
  var change = 0;
  var sfield = '';
  var fieldvalue = '';
  if (name && change === 0) {
    sfield = 'name';
    fieldvalue = name;
    change = 1;
  }
  if (birthyear && change === 0) {
    sfield = 'birthyear';
    fieldvalue = birthyear;
    change = 1;
  }
  if (deathyear && change === 0) {
    sfield = 'deathyear';
    fieldvalue = deathyear;
    change = 1;
  }

  var url = `http://${config.server_host}:${config.server_port}/getactor?field=${sfield}&fieldvalue=${fieldvalue}`;
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

const getMovieSearch = async (
  moviename,
  director,
  movieyear,
  runtime,
  writer,
  genre,
  rating,
  actor,
  birth,
  death
) => {
  var change = 0;
  var sfield = '';
  var fieldvalue = '';
  if (moviename && change === 0) {
    sfield = 'moviename';
    fieldvalue = moviename;
    change = 1;
  }
  if (director && change === 0) {
    sfield = 'director';
    fieldvalue = director;
    change = 1;
  }
  if (movieyear && change === 0) {
    sfield = 'movieyear';
    fieldvalue = movieyear;
    change = 1;
  }
  if (runtime && change === 0) {
    sfield = 'runtime';
    fieldvalue = runtime;
    change = 1;
  }
  if (writer && change === 0) {
    sfield = 'writer';
    fieldvalue = writer;
    change = 1;
  }
  if (genre && change === 0) {
    sfield = 'genre';
    fieldvalue = genre;
    change = 1;
  }
  if (actor && change === 0) {
    console.log('name');
    sfield = 'actor';
    fieldvalue = actor;
    change = 1;
  }
  if (birth && change === 0) {
    sfield = 'birthyear';
    fieldvalue = birth;
    change = 1;
  }
  if (death && change === 0) {
    sfield = 'deathyear';
    fieldvalue = death;
    change = 1;
  }
  if (rating && change === 0) {
    sfield = 'movierating';
    fieldvalue = rating;
    change = 1;
  }

  var url = `http://${config.server_host}:${config.server_port}/getmovie?field=${sfield}&fieldvalue=${fieldvalue}`;
  console.log(url);
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

const getAllMovies = async (page, pagesize, league) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`,
    {
      method: 'GET',
    }
  );
  return res.json();
};

const getPopularMovies = async (rating, genre) => {
  var url = `http://${config.server_host}:${config.server_port}/getpopularmovie?rating=${rating}&genre=${genre}`;
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

const getRandomMovies = async (page, pagesize) => {
  var res = await fetch(`http://127.0.0.1:8080/getrandommovie`, {
    method: 'GET',
  });
  return res.json();
};

const getQualityMovies = async (genre) => {
  var url = `http://${config.server_host}:${config.server_port}/getqualitymovie?genre=${genre}`;
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

const simpleActorSearch = async (namepattern) => {
  var url = '';
  if (namepattern) {
    url = `http://127.0.0.1:8080/findname?namepattern=${namepattern}%`;
    var res = await fetch(url, {
      method: 'GET',
    });
    return res.json();
  } else {
    url = `http://127.0.0.1:8080/findname`;
    var res = await fetch(url, {
      method: 'GET',
    });
    return res.json();
  }
};

const simpleMovieSearch = async (namepattern) => {
  var url = '';
  if (namepattern) {
    url = `http://127.0.0.1:8080/findKeyword?keywordPattern=${namepattern}`;
    var res = await fetch(url, {
      method: 'GET',
    });
    return res.json();
  } else {
    url = `http://127.0.0.1:8080/findKeyword`;
    var res = await fetch(url, {
      method: 'GET',
    });
    return res.json();
  }
};
const getPlayerSearch = async (
  name,
  nationality,
  club,
  rating_high,
  rating_low,
  pot_high,
  pot_low,
  page,
  pagesize
) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`,
    {
      method: 'GET',
    }
  );
  return res.json();
};

const getMovieDetails = async (constNumber) => {
  var url = `http://${config.server_host}:${config.server_port}/getPost?field=movieId&fieldvalue=${constNumber}`;
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

const getMoreDetails = async (constNumber) => {
  var url = `https://api.themoviedb.org/3/find/${constNumber}?api_key=015674d8405c29d3e9a63f241f81ca19&language=en-US&external_source=imdb_id`;
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

const getActorsDetails = async (constNumber) => {
  var url = `https://api.themoviedb.org/3/person/${constNumber}?api_key=015674d8405c29d3e9a63f241f81ca19&language=en-US`;
  var res = await fetch(url, {
    method: 'GET',
  });
  return res.json();
};

export {
  getMovieSearch,
  getAllMovies,
  getPopularMovies,
  getQualityMovies,
  simpleActorSearch,
  simpleMovieSearch,
  getPlayerSearch,
  getRandomMovies,
  getActorSearch,
  getMovieDetails,
  getMoreDetails,
  getActorsDetails,
};
