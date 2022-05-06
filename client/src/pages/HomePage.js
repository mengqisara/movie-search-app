import React from 'react';

import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import MenuBar from '../components/MenuBar';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
} from 'shards-react';

import { Row, Col } from 'antd';
import { getRandomMovies, getMoreDetails } from '../fetcher';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radndomMovieOneID: 'ID1',
      radndomMovieTwoID: 'ID2',
      radndomMovieOnePic: 'https://i.ibb.co/h9L8Xkk/nophoto.jpg',
      radndomMovieTwoPic: 'https://i.ibb.co/h9L8Xkk/nophoto.jpg',
    };

    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  componentDidMount() {
    var count = 0;
    getRandomMovies().then((res) => {
      for (let i = 0; i < res.results.length; i++) {
        if (count < 2) {
          if (res.results[i]) {
            var tconstID = res.results[i].tconst;
            if (tconstID && count === 0) {
              this.setState({
                radndomMovieOneID: tconstID,
              });
              getMoreDetails(tconstID)
                .then((res) => {
                  if (res.movie_results[0] != null) {
                    if (res.movie_results[0].poster_path) {
                      this.setState({
                        radndomMovieOnePic: `https://image.tmdb.org/t/p/original${res.movie_results[0].poster_path}`,
                      });
                    }
                  }
                })
                .catch((error) => {
                  console.log('Error fetching and parsing data', error);
                });

              count++;
            } else if (tconstID && count === 1) {
              this.setState({
                radndomMovieTwoID: tconstID,
              });
              getMoreDetails(tconstID)
                .then((res) => {
                  if (res.movie_results[0] != null) {
                    if (res.movie_results[0].poster_path) {
                      this.setState({
                        radndomMovieTwoPic: `https://image.tmdb.org/t/p/original${res.movie_results[0].poster_path}`,
                      });
                    }
                  }
                })
                .catch((error) => {
                  console.log('Error fetching and parsing data', error);
                });

              count++;
            }
          }
        } else {
          break;
        }
      }
    });
  }

  updateSearchResults() {
    var count = 0;
    getRandomMovies().then((res) => {
      for (let i = 0; i < res.results.length; i++) {
        if (count < 2) {
          if (res.results[i]) {
            var tconstID = res.results[i].tconst;
            if (tconstID && count === 0) {
              this.setState({
                radndomMovieOneID: tconstID,
              });
              getMoreDetails(tconstID)
                .then((res) => {
                  if (res.movie_results[0] != null) {
                    if (res.movie_results[0].poster_path) {
                      this.setState({
                        radndomMovieOnePic: `https://image.tmdb.org/t/p/original${res.movie_results[0].poster_path}`,
                      });
                    }
                  }
                })
                .catch((error) => {
                  console.log('Error fetching and parsing data', error);
                });

              count++;
            } else if (tconstID && count === 1) {
              this.setState({
                radndomMovieTwoID: tconstID,
              });
              getMoreDetails(tconstID)
                .then((res) => {
                  if (res.movie_results[0] != null) {
                    if (res.movie_results[0].poster_path) {
                      this.setState({
                        radndomMovieTwoPic: `https://image.tmdb.org/t/p/original${res.movie_results[0].poster_path}`,
                      });
                    }
                  }
                })
                .catch((error) => {
                  console.log('Error fetching and parsing data', error);
                });

              count++;
            }
          }
        } else {
          break;
        }
      }
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div>
          <img
            alt="tc"
            style={{ width: '100%', height: 'auto' }}
            src="https://i.ibb.co/Vt6BWYR/picture-bar.jpg"
          />
        </div>
        <div style={{ marginLeft: '65vh', marginTop: '5vh' }}>
          <h3>Welcome to the CJSW Movie Database!</h3>
        </div>
        <div
          style={{
            position: 'relative',
            left: '2%',
          }}
        >
          <Row>
            <Card
              style={{ marginLeft: '12%', width: '300px', height: '410px' }}
            >
              <CardHeader></CardHeader>
              <CardImg src="https://i.ibb.co/r2Sf9DP/moviesearch3.jpg" />
              <CardBody>
                <CardTitle>Movie Search</CardTitle>
                <p>
                  Search more than 100,000 movies in our database with keywords
                  such as movie name, genre, release year, and more!
                </p>
                <Button theme="dark" href="/movies">
                  Search Movies &rarr;
                </Button>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card
              style={{ marginLeft: '5vh', width: '300px', height: '410px' }}
            >
              <CardHeader></CardHeader>
              <CardImg src="https://i.ibb.co/fdTJVdY/actorsearch.jpg" />
              <CardBody>
                <CardTitle>Actor Search</CardTitle>
                <p>
                  Search more than 150,000 actors in our database with keywords
                  such as movie name and birthday - get to know your favorite
                  actor!
                </p>
                <Button theme="dark" href="/actors">
                  Search Actors &rarr;
                </Button>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>

            <Card
              style={{ marginLeft: '5vh', width: '460px', height: '410px' }}
            >
              <CardHeader></CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle>Feeling Lucky?</CardTitle>
                  </Col>
                  <Col>
                    <Button
                      theme="light"
                      style={{ marginLeft: '5vh' }}
                      onClick={this.updateSearchResults}
                    >
                      Get Two Other Movies?
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <label style={{ marginTop: '2vh' }}>
                    We pick these movies for you to check out today!
                  </label>
                </Row>
                <Row>
                  <Link to={`/movies=${this.state.radndomMovieOneID}`}>
                    <Image
                      src={this.state.radndomMovieOnePic}
                      style={{
                        marginLeft: '10vh',
                        marginTop: '1vh',
                        width: '135px',
                        height: '200px',
                      }}
                    />
                  </Link>
                  <Link to={`/movies=${this.state.radndomMovieTwoID}`}>
                    <Image
                      src={this.state.radndomMovieTwoPic}
                      style={{
                        marginLeft: '15px',
                        marginTop: '5px',
                        width: '135px',
                        height: '200px',
                      }}
                    />
                  </Link>
                </Row>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Row>
        </div>
        <div
          style={{
            marginTop: '7%',
            backgroundColor: 'DarkRed',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              marginTop: '4vh',
              width: '80%',
              float: 'left',
              color: 'white',
              marginLeft: '17%',
            }}
          >
            <h5
              style={{
                color: 'white',
                marginLeft: '25%',
              }}
            >
              Thank you for visiting the CJSW database!
            </h5>
            <p
              style={{
                color: 'white',
                marginLeft: '25%',
              }}
            >
              Created by Changlei Li, Jack Yu, Mengqi Liu, Winston Tang
            </p>
            <Row></Row>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
