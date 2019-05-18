'use strict';

const ProjectName    = 'react-tidbits';
const ProjectVersion = '0.0.1-pre.1';
const ProjectHome    = 'https://github.com/attogram/react-tidbits';

const defaultInterval = 5000; // 5 seconds
const defaultTidbits = ['404 Tidbits Not Found', 'Tidbits Missing', '?'];

class Tidbits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current : 0,
            debugMode: true,
            interval: this.props.interval ? this.props.interval : defaultInterval,
            tidbits : this.props.tidbits ? this.props.tidbits : defaultTidbits,
        };
        this.debug = this.debug.bind(this);
        this.debug('constructor: ' + ProjectName + ' v' + ProjectVersion + ' <' + ProjectHome + '>');
        this.debug('constructor: this.state: ' + JSON.stringify(this.state));
        this.debug('constructor: tidbits.length: ' + this.state.tidbits.length);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.debug('componentDidMount: setInterval: timer: ' + this.state.interval);
        this.timer = setInterval(this.tick, this.state.interval);
        this.tick();
    }

    componentWillUnmount() {
        this.debug('componentWillUnmount: clearInterval: timer');
        clearInterval(this.timer);
    }

    tick() {
        const current = Math.floor(Math.random() * (this.state.tidbits.length));
        this.debug('tick: current: ' + current);
        this.setState({
            current: current,
        });
    }

    render() {
        const currentTidbit = this.state.tidbits[this.state.current];
        this.debug('render: currentTidbit: ' + currentTidbit);
        return currentTidbit;
    }

    debug(message) {
        if (this.state.debugMode) {
            console.log('Tidbits.js: ' + (new Date()).toISOString() + ': ' + message);
        }
    };
}

