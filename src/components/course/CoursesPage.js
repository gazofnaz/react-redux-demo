import React, {PropTypes} from 'react';

class CoursesPage extends React.Component {

    constructor( props, context ){
        super( props, context );

        this.state = {
            course: {
                title: ""
            }
        };

        // We need to bind this here so we can use "this" to get the state in these methods
        // Otherwise "this" is bound to the input from where they are called
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    }

    onTitleChange(event){
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({
                course: course
            }
        );
    }

    onClickSave(){
        alert(`Saving ${this.state.course.title}`);
    }

    // Don't define new functions inside a render call, it impacts performance
    render(){
        return(
            <div>
                <h1>Courses</h1>
                <h2>Add Course</h2>

                {/* By default "this" here refers to the input object*/}
                <input
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title}
                />

                <input
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave}
                />

            </div>
        );
    }
}

export default CoursesPage;