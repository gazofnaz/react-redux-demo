import React, {PropTypes} from 'react';
import Header from './common/Header';
/**
 * This component will wrap all other components, and likely contain headers, footers,
 * and other reusable things
 */
class App extends React.Component {
    render(){
        return(
            <div className="container-fluid">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

/**
 * This component must have some children which will be passed in from the router
 */
App.propTypes = {
  children: PropTypes.object.inRequired
};

export default App;