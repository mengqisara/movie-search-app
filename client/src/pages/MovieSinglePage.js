import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from 'shards-react';
import { Image } from 'react-bootstrap';

import MenuBar from '../components/MenuBar';
import { getMovieDetails, getMoreDetails } from '../fetcher';

export default class MovieSinglePage extends React.Component {
  constructor(props) {
    super();
    var url = window.location.pathname;
    var movieID = url.substring(url.indexOf('=') + 1);

    this.movieID = movieID;

    this.toggle = this.toggle.bind(this);
    this.state = {
      Name: '',
      ReleaseYear: '',
      Runtime: '',
      Genre: '',
      Director: '',
      Writer: '',
      Rating: '',
      Poster: '',
      Description: '',
    };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  componentDidMount() {
    getMovieDetails(this.movieID)
      .then((res) => {
        this.setState({
          Name: res.results[0].Name,
          ReleaseYear: res.results[0].ReleaseYear,
          Runtime: res.results[0].Runtime,
          Genre: res.results[0].Genre,
          Director: res.results[0].Director,
          Writer: res.results[0].Writer,
          Rating: res.results[0].Rating,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });

    getMoreDetails(this.movieID)
      .then((res) => {
        if (res.movie_results[0] == null) {
          this.setState({
            Poster: `https://i.ibb.co/h9L8Xkk/nophoto.jpg`,
          });
        } else {
          if (res.movie_results[0].poster_path) {
            this.setState({
              Poster: `https://image.tmdb.org/t/p/original${res.movie_results[0].poster_path}`,
            });
          }
          if (res.movie_results[0].overview) {
            this.setState({
              Description: res.movie_results[0].overview,
            });
          }
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
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
            src="https://i.ibb.co/k8hD16K/movieS.jpg"
          />
        </div>
        <div>
          <Card
            style={{ marginLeft: '55vh', width: '800px', marginTop: '5vh' }}
          >
            <CardHeader>
              <a href="/movies">Movie Search/</a>
              <a href="#top">Movie Details</a>
            </CardHeader>
            <CardBody>
              <CardTitle>Movie Name: {this.state.Name}</CardTitle>
              <Container className="dr-example-container">
                <Row>
                  <Col>
                    <Image src={this.state.Poster} style={{ width: '230px' }} />
                  </Col>
                  <Col>
                    <Card style={{ width: '430px', marginLeft: '5px' }}>
                      <CardBody>
                        <Container className="dr-example-container"></Container>
                        <Row>
                          <h6>Release Year: {this.state.ReleaseYear}</h6>
                        </Row>
                        <Row>
                          <h6>Genre: {this.state.Genre}</h6>
                        </Row>
                        <Row>
                          <h6>Run time: {this.state.Runtime}</h6>
                        </Row>
                        <Row>
                          <h6>Director: {this.state.Director}</h6>
                        </Row>
                        <Row>
                          <h6>Writer: {this.state.Writer}</h6>
                        </Row>
                        <Row>
                          <h6>Rating: {this.state.Rating}</h6>
                        </Row>
                        <Row>
                          <h7>Description: {this.state.Description}</h7>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
          <Row style={{ marginTop: '10vh' }}></Row>
        </div>
        <div
          style={{
            marginTop: '12%',
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
