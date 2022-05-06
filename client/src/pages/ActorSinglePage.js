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
import { getActorsDetails, getMoreDetails } from '../fetcher';

export default class ActorSinglePage extends React.Component {
  constructor(props) {
    super();
    var url = window.location.pathname;
    var movieID = url.substring(url.indexOf('=') + 1);
    this.movieID = movieID;

    this.toggle = this.toggle.bind(this);
    this.state = {
      Name: '',
      Gender: '',
      birthday: '',
      deathday: '',
      known_for_department: '',
      place_of_birth: '',
      Rating: '',
      Poster: '',
      Description: '',
    };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  componentDidMount() {
    getMoreDetails(this.movieID)
      .then((res) => {
        if (res.person_results[0] == null) {
        } else {
          if (res.person_results[0].id) {
            getActorsDetails(res.person_results[0].id)
              .then((res) => {
                var gender = 'No Information';
                if (res.gender === 1) {
                  gender = 'Female';
                } else if (res.gender === 2) {
                  gender = 'Male';
                }
                this.setState({
                  Name: res.name,
                  Gender: gender,
                  birthday: res.birthday,
                  deathday: res.deathday,
                  known_for_department: res.known_for_department,
                  place_of_birth: res.place_of_birth,
                  Description: res.biography,
                  Poster: `https://image.tmdb.org/t/p/original${res.profile_path}`,
                });
              })
              .catch((error) => {
                console.log('Error fetching and parsing data', error);
              });
          }
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <MenuBar />
        <div>
          <img
            alt="tc"
            style={{ width: '100%', height: 'auto' }}
            src="https://i.ibb.co/PTbfBcf/actorsearch2.jpg"
          />
        </div>
        <div>
          <Card
            style={{ marginLeft: '55vh', width: '800px', marginTop: '5vh' }}
          >
            <CardHeader>
              <a href="/movies">Actor Search/</a>
              <a href="#top">Actor Details</a>
            </CardHeader>
            <CardBody>
              <CardTitle>Name: {this.state.Name}</CardTitle>
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
                          <h6>Gender: {this.state.Gender}</h6>
                        </Row>
                        <Row>
                          <h6>Birthday: {this.state.birthday}</h6>
                        </Row>
                        <Row>
                          <h6>
                            Death Date:{' '}
                            {this.state.deathday
                              ? this.state.deathday
                              : 'Alive'}
                          </h6>
                        </Row>
                        <Row>
                          <h6>Profession: {this.state.known_for_department}</h6>
                        </Row>
                        <Row>
                          <h6>Place of Birth: {this.state.place_of_birth}</h6>
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
