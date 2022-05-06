import React from 'react';
import { Form, FormInput, FormGroup, Button, Collapse } from 'shards-react';

import { Table, Row, Col, Divider, Slider } from 'antd';

import { getMovieSearch, simpleMovieSearch } from '../fetcher';
import MenuBar from '../components/MenuBar';

const movieColumns = [
  {
    title: 'Movie Name',
    dataIndex: 'Name',
    key: 'Name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => (
      <a href={`/movies=${row.tconst}`} key={row.tconst}>
        {text}
      </a>
    ),
  },
  {
    title: 'Runtime',
    dataIndex: 'Runtime',
    key: 'Runtime',
    sorter: (a, b) => a.Runtime.localeCompare(b.Runtime),
  },
  {
    title: 'Release Year',
    dataIndex: 'Release_year',
    key: 'Release_year',
    sorter: (a, b) => a.Release_year.localeCompare(b.Release_year),
  },
];

class MoviesPage extends React.Component {
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
      Rating: 5,
      Actor: '',
      Birth: '',
      Death: '',
      moviesResults: [],
      GeneralSearch: '',

      collapse: false,
    };

    this.handleActorChange = this.handleActorChange.bind(this);
    this.handleBirthChange = this.handleBirthChange.bind(this);
    this.handleDeathChange = this.handleDeathChange.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
    this.handleDirectorQueryChange = this.handleDirectorQueryChange.bind(this);
    this.handleWriterQueryChange = this.handleWriterQueryChange.bind(this);
    this.handleRelease_yearChange = this.handleRelease_yearChange.bind(this);
    this.handleRuntimeChange = this.handleRuntimeChange.bind(this);
    this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleGeneralSearchChange = this.handleGeneralSearchChange.bind(this);
    this.updateSimpleMovieSearch = this.updateSimpleMovieSearch.bind(this);
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleActorChange(event) {
    this.setState({ Actor: event.target.value });
  }

  handleBirthChange(event) {
    this.setState({ Birth: event.target.value });
  }

  handleDeathChange(event) {
    this.setState({ Death: event.target.value });
  }

  handleGeneralSearchChange(event) {
    this.setState({ GeneralSearch: event.target.value });
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

  handleRatingChange(value) {
    this.setState({ Rating: value });
  }

  handleRuntimeChange(event) {
    this.setState({ RuntimeQuery: event.target.value });
  }

  updateSimpleMovieSearch() {
    simpleMovieSearch(this.state.GeneralSearch).then((res) => {
      this.setState({ moviesResults: res.results });
    });
  }

  updateSearchResults() {
    getMovieSearch(
      this.state.nameQuery,
      this.state.DirectorQuery,
      this.state.Release_yearQuery,
      this.state.RuntimeQuery,
      this.state.WriterQuery,
      this.state.Genre,
      this.state.Rating,
      this.state.Actor,
      this.state.Birth,
      this.state.Death
    ).then((res) => {
      this.setState({ moviesResults: res.results });
    });
  }

  componentDidMount() {
    simpleMovieSearch(this.state.GeneralSearch).then((res) => {
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
            src="https://i.ibb.co/JKrPwd1/moviepic2.jpg"
          />
        </div>
        <Form
          style={{
            width: '80vw',
            margin: '0 auto',
            marginTop: '11vh',
          }}
        >
          <Row style={{ marginLeft: '25vh' }}>
            <Col>
              <FormGroup
                style={{ marginLeft: '60vh', width: '40vw', margin: '0 auto' }}
              >
                <label>Type any keyword</label>
                <FormInput
                  squared
                  placeholder="Movie keywords"
                  value={this.state.GeneralSearch}
                  onChange={this.handleGeneralSearchChange}
                />
              </FormGroup>
            </Col>
            <Col style={{ marginLeft: '5vh' }}>
              <FormGroup style={{ width: '14vw' }}>
                <Button
                  squared
                  theme="dark"
                  style={{ marginTop: '4vh' }}
                  onClick={this.updateSimpleMovieSearch}
                >
                  Search for Movies
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Row>
          <Button
            squared
            theme="dark"
            style={{ width: '55%', marginLeft: '43vh', marginTop: '3vh' }}
            onClick={this.toggle}
          >
            Or... Use Advanced Search
          </Button>
          <Collapse open={this.state.collapse}>
            <div className="p-3 mt-3 border rounded">
              <Form style={{ width: '100vw' }}>
                <Row>
                  <Col flex={2}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                      <label>Movie Name</label>
                      <FormInput
                        placeholder="Movie Name"
                        value={this.state.nameQuery}
                        onChange={this.handleNameQueryChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                      <label>Director</label>
                      <FormInput
                        placeholder="Director"
                        value={this.state.DirectorQuery}
                        onChange={this.handleDirectorQueryChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                      <label>Writer</label>
                      <FormInput
                        placeholder="Writer"
                        value={this.state.WriterQuery}
                        onChange={this.handleWriterQueryChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                        marginTop: '3vh',
                      }}
                    >
                      <label>Release_year</label>
                      <FormInput
                        placeholder="Release_year"
                        value={this.state.Release_yearQuery}
                        onChange={this.handleRelease_yearChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                        marginTop: '3vh',
                      }}
                    >
                      <label>Runtime</label>
                      <FormInput
                        placeholder="Runtime"
                        value={this.state.RuntimeQuery}
                        onChange={this.handleRuntimeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                        marginTop: '3vh',
                      }}
                    >
                      <label>Genre</label>
                      <FormInput
                        placeholder="Genre"
                        value={this.state.GenreQuery}
                        onChange={this.handleGenreQueryChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                        marginTop: '3vh',
                      }}
                    >
                      <label>Actor Name</label>
                      <FormInput
                        placeholder="Actor Name"
                        value={this.state.Actor}
                        onChange={this.handleActorChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                        marginTop: '3vh',
                      }}
                    >
                      <label>Actor Birth Year</label>
                      <FormInput
                        placeholder="Actor Birth Year"
                        value={this.state.Birth}
                        onChange={this.handleBirthChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                        marginTop: '3vh',
                      }}
                    >
                      <label>Actor Death Year(if any)</label>
                      <FormInput
                        placeholder="Actor Death Year(if any)"
                        value={this.state.Death}
                        onChange={this.handleDeathChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col flex={3}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                      <label>Rating</label>
                      <Slider
                        defaultValue={5}
                        max={10}
                        onChange={this.handleRatingChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={3}>
                    <FormGroup style={{ width: '10vw' }}>
                      <Button
                        style={{ marginTop: '4vh' }}
                        onClick={this.updateSearchResults}
                      >
                        Search
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col flex={3}>
                    <h7>Note: Please search one criteria at a time. :)</h7>
                  </Col>
                </Row>
              </Form>
            </div>
          </Collapse>
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

export default MoviesPage;
