import React, { Component } from 'react';
import axios from 'axios';

//This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.
export default class MoviePage extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      user: {},
      materials: [],
      authUser: {},
      courseID: '',
    };
    //bind this.handleDelete to the constructor because in JavaScript, class methods are not bound by default
    this.handleDelete = this.handleDelete.bind(this);
  }

  //fetch data from api and store information on the course and user to state
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then((response) => {
        //console.log("data")
        //console.log(response.data.course)
        this.setState({
          course: response.data.course,
          user: response.data.course.user,
          courseID: response.data.course.id,
        });
        //console.log('Done fetching!')
        //console.log(response.data.course.user)
        if (response.data.course.materialsNeeded) {
          this.setState({
            //split materials text into bullet points
            materials: response.data.course.materialsNeeded.split('* '),
          });
        }

        const { context } = this.props;
        if (context.authenticatedUser) {
          console.log('user!');
          this.setState({
            authUser: context.authenticatedUser,
          });
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        this.props.history.push('/error');
      });
  }

  render() {
    //console.log("seeing prop")
    //console.log(document.referrer)
    //console.log("seeing course")
    //console.log(this.state.course)
    var courseInfo = this.state.course;
    let materials = this.state.materials;
    let instructor = this.state.user;
    //const myArray = materials.split(" ");
    //console.log("material")
    //console.log(this.state.materials)

    //mapping all the materials, if any
    var count = 1;
    var materialsList = materials.map((object) => {
      if (object !== '') {
        count = count + 1;
        return <li key={count}>{object}</li>;
      }
    });
    //console.log(myArray)

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    console.log('making sure userID checks out');
    console.log(context.currentUrl);
    // console.log(instructor)

    //line 116- 140: The CourseDetail component only renders the "Update Course" and "Delete Course"
    //buttons if: There's an authenticated user. The authenticated user's ID matches that of the user who
    //owns the course.
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <React.Fragment>
              <a className="button button-secondary" href="/">
                Return to List
              </a>
            </React.Fragment>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{courseInfo.title}</h4>
                <p>
                  By {instructor.firstName} {instructor.lastName}
                </p>
                <p>{courseInfo.description}</p>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{courseInfo.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">{materialsList}</ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
