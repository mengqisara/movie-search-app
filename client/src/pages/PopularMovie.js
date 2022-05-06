import React from 'react';
import { Form, FormInput, FormGroup, Button } from 'shards-react';

import { Table, Row, Col, Divider, Slider } from 'antd';

import MenuBar from '../components/MenuBar';
import {
  getRandomMovies,
  getPopularMovies,
  getQualityMovies,
} from '../fetcher';

const movieColumns = [
  {
    title: 'Movie Name',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => (
      <a href={`/movies=${row.tconst}`} key={row.tconst}>
        {text}
      </a>
    ),
  },
  {
    title: 'Runtime',
    dataIndex: 'runtime',
    key: 'runtime',
    sorter: (a, b) => a.Director.localeCompare(b.Director),
  },
  {
    title: 'Release Year',
    dataIndex: 'year',
    key: 'year',
    sorter: (a, b) => a.Release_year.localeCompare(b.Release_year),
  },
];

class PopularMovie extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      nameQuery: '',
      DirectorQuery: '',
      WriterQuery: '',
      Release_yearQuery: '',
      Genre: '',
      RuntimeQuery: '',
      GenreTwo: '',
      Rating: 5,
      moviesResults: [],
      collapse: false,
    };

    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.updatePopularSearchResults =
      this.updatePopularSearchResults.bind(this);
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
    this.handleDirectorQueryChange = this.handleDirectorQueryChange.bind(this);
    this.handleWriterQueryChange = this.handleWriterQueryChange.bind(this);
    this.handleRelease_yearChange = this.handleRelease_yearChange.bind(this);
    this.handleRuntimeChange = this.handleRuntimeChange.bind(this);
    this.handleGenreTwoChange = this.handleGenreTwoChange.bind(this);

    this.updateQualitySearchResults =
      this.updateQualitySearchResults.bind(this);
    this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleNameQueryChange(event) {
    this.setState({ nameQuery: event.target.value });
  }

  handleWriterQueryChange(event) {
    this.setState({ WriterQuery: event.target.value });
  }

  handleDirectorQueryChange(event) {
    this.setState({ DirectorQuery: event.target.value });
  }

  handleRelease_yearChange(event) {
    this.setState({ Release_yearQuery: event.target.value });
  }

  handleGenreQueryChange(event) {
    this.setState({ Genre: event.target.value });
  }

  handleGenreTwoChange(event) {
    this.setState({ GenreTwo: event.target.value });
  }

  handleRatingChange(value) {}

  handleRuntimeChange(event) {
    this.setState({ RuntimeQuery: event.target.value });
  }

  updateQualitySearchResults() {
    getQualityMovies(this.state.GenreTwo).then((res) => {
      this.setState({ moviesResults: res.results });
    });
  }

  updatePopularSearchResults() {
    getPopularMovies(this.state.Rating, this.state.Genre).then((res) => {
      this.setState({ moviesResults: res.results });
    });
  }

  updateSearchResults() {
    getRandomMovies().then((res) => {
      this.setState({ moviesResults: res.results });
    });
  }

  componentDidMount() {
    getRandomMovies().then((res) => {
      this.setState({ moviesResults: res.results });
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
            src="https://i.ibb.co/3NFVV4S/editorchoice.jpg"
          />
        </div>
        <Form
          style={{
            width: '100vw',
            margin: '0 auto',
            marginTop: '11vh',
          }}
        >
          <h5 style={{ marginLeft: '36vh' }}>
            Welcome to the Editors' Choice!
          </h5>
          <h7 style={{ marginLeft: '36vh' }}>
            Hey there, don't want to overthink what movies to watch? We are here
            to help! You can:{' '}
          </h7>
          <li style={{ marginLeft: '38vh' }}>
            Give us a movie genre and rating number and we can select our
            recommendations for you;
          </li>
          <li style={{ marginLeft: '38vh' }}>
            Give us JUST a movie genre we can select our picks for you;
          </li>
          <li style={{ marginLeft: '38vh' }}>
            Or... Just click "Feeling Lucky" and Let Fly!
          </li>
          <p></p>
          <Row style={{ marginLeft: '36vh' }}>
            <Col>
              <FormGroup
                style={{ marginLeft: '40vh', width: '20vw', margin: '0 auto' }}
              >
                <label>Movie Genre</label>
                <FormInput
                  squared
                  placeholder="Type in a movie genre&pick a rating #!"
                  value={this.state.Genre}
                  onChange={this.handleGenreQueryChange}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup
                style={{ marginLeft: '30vh', width: '23vw', margin: '0 auto' }}
              >
                <label>Rating</label>
                <Slider
                  defaultValue={5}
                  max={10}
                  onChange={this.handleRatingChange}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup style={{ width: '24vw' }}>
                <Button
                  squared
                  theme="dark"
                  style={{ marginTop: '4vh', marginLeft: '2vh' }}
                  onClick={this.updatePopularSearchResults}
                >
                  Editor's Choice
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <Row style={{ marginLeft: '36vh' }}>
          <Col>
            <FormGroup
              style={{ marginLeft: '70vh', width: '20vw', margin: '0 auto' }}
            >
              <FormInput
                squared
                placeholder="Movie genre"
                value={this.state.GenreTwo}
                onChange={this.handleGenreTwoChange}
              />
            </FormGroup>
          </Col>

          <Col style={{ marginLeft: '5vh' }}>
            <FormGroup style={{ width: '40vw' }}>
              <Button
                squared
                theme="dark"
                onClick={this.updateQualitySearchResults}
              >
                Get Quality Movie Recommendations
              </Button>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Button
            squared
            theme="dark"
            style={{ width: '55%', marginLeft: '36vh', marginTop: '3vh' }}
            onClick={this.updateSearchResults}
          >
            Or... Feeling Lucky Today?
          </Button>
        </Row>
        <Divider />
        <Table
          style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}
          dataSource={this.state.moviesResults}
          columns={movieColumns}
          pagination={{
            pageSizeOptions: [5, 10],
            defaultPageSize: 5,
            showQuickJumper: true,
          }}
        />
        <Divider />
      </div>
    );
  }
}

export default PopularMovie;
