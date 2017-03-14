import React, {PropTypes} from 'react';

/**
 * Allows some dots to be displayed during loading phases
 */
class LoadingDots extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {frame: 1};
    }

    /**
     * Add one to the 'frame' state every 300 milliseconds
     */
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({  // eslint-disable-line react/no-did-mount-set-state
                frame: this.state.frame + 1
            });
        }, this.props.interval);
    }

    /**
     *
     */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let dots = this.state.frame % (this.props.dots + 1);
        let text = '';
        while (dots > 0) {
            text += '.';
            dots--;
        }
        return <span {...this.props}>{text}&nbsp;</span>;
    }
}

/**
 *
 * @type {{interval: number, dots: number}}
 */
LoadingDots.defaultProps = {
    interval: 300, dots: 3
};

/**
 *
 * @type {{interval: *, dots: *}}
 */
LoadingDots.propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
};

export default LoadingDots;
