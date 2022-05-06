import React from 'react';
import { Form, FormInput, FormGroup, Button, Collapse } from 'shards-react';

import { Table, Row, Col, Divider } from 'antd';
import { getActorSearch, simpleActorSearch } from '../fetcher';

import MenuBar from '../components/MenuBar';

const movieColumns = [
  {
    title: 'Actor Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => (
      <a href={`/actors=${row.nconst}`} key={row.tconst}>
        {text}
      </a>
    ),
  },
  {
    title: 'Birth Year',
    dataIndex: 'birthday',
    key: 'birthday',
    sorter: (a, b) => a.Birth.localeCompare(b.Birth),
  },
  {
    title: 'Death Year (if not Alive)',
    dataIndex: 'deathday',
    key: 'deathday',
    sorter: (a, b) => a.Death.localeCompare(b.Death),
  },
];

class ActorsPage extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      nameQuery: '',
      ActorID: '',
      WriterQuery: '',
      BirthQuery: '',
      Genre: '',
      DeathQuery: '',
      GeneralSearch: '',
      collapse: false,
    };

    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.updateSimpleActorSearch = this.updateSimpleActorSearch.bind(this);
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
    this.handleDirectorQueryChange = this.handleDirectorQueryChange.bind(this);
    this.handleWriterQueryChange = this.handleWriterQueryChange.bind(this);
    this.handleBirthChange = this.handleBirthChange.bind(this);
    this.handleDeathChange = this.handleDeathChange.bind(this);
    this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleGeneralSearchChange = this.handleGeneralSearchChange.bind(this);
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
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
    this.setState({ ActorID: event.target.value });
  }

  handleBirthChange(event) {
    this.setState({ BirthQuery: event.target.value });
  }

  handleGenreQueryChange(event) {
    this.setState({ Genre: event.target.value });
  }

  handleRatingChange(value) {
    this.setState({ potHighQuery: value[1] });
    this.setState({ potLowQuery: value[0] });
  }

  handleDeathChange(event) {
    this.setState({ DeathQuery: event.target.value });
  }

  updateSimpleActorSearch() {
    simpleActorSearch(this.state.GeneralSearch).then((res) => {
      this.setState({ actorsResults: res.results });
      console.log('set results');
      console.log(res.results);
      console.log(this.state.actorsResults);
    });
  }
  updateSearchResults() {
    getActorSearch(
      this.state.nameQuery,
      this.state.BirthQuery,
      this.state.DeathQuery
    ).then((res) => {
      this.setState({ actorsResults: res.results });
    });
  }

  componentDidMount() {
    simpleActorSearch(this.state.GeneralSearch).then((res) => {
      this.setState({ actorsResults: res.results });
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
            src="https://i.ibb.co/QMsJ5dK/Actorpic.jpg"
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
                  placeholder="Actor keywords"
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
                  onClick={this.updateSimpleActorSearch}
                >
                  Search
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
                      <label>Actor Name</label>
                      <FormInput
                        placeholder="Movie Name"
                        value={this.state.nameQuery}
                        onChange={this.handleNameQueryChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                      }}
                    >
                      <label>Birth</label>
                      <FormInput
                        placeholder="Birth"
                        value={this.state.BirthQuery}
                        onChange={this.handleBirthChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col flex={2}>
                    <FormGroup
                      style={{
                        width: '20vw',
                        margin: '0 auto',
                      }}
                    >
                      <label>Death</label>
                      <FormInput
                        placeholder="Death"
                        value={this.state.DeathQuery}
                        onChange={this.handleDeathChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col flex={2}>
                    <Button
                      style={{ marginTop: '4vh', marginLeft: '100vh' }}
                      onClick={this.updateSearchResults}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col flex={2}>
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
          dataSource={this.state.actorsResults}
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

export default ActorsPage;
