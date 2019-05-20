/**
 * React Tidbits - show ever-changing text
 *
 * License: MIT
 * Repository: https://github.com/attogram/react-tidbits
 */

'use strict';

const TidbitsVersion = '0.0.4';

class Tidbits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current : 0,
            interval: this.props.interval
                ? this.props.interval
                : 5000,
            tidbits : this.props.tidbits
                ? this.props.tidbits
                : ['404 Tidbits Not Found'],
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, this.state.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            current: Math.floor(Math.random() * (this.state.tidbits.length)),
        });
    }

    render() {
        return this.state.tidbits[this.state.current];
    }
}
