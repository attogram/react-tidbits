/**
 * React Tidbits - show ever-changing content
 *
 *   example:
 *
 *   // interval = milliseconds between changes. 1000 milliseconds = 1 second.
 *   const interval = 2000;
 *
 *   // order = "ordered" (default) or "random"
 *   const order = "random";
 *
 *   // tidbits = an array of message, text strings or JSX
 *   const tidbits = [
 *      "Text message",
 *      (<span><b>JSX</b> message</span>),
 *   ];
 *
 *   <Tidbits
 *      interval={interval}
 *      order={order}
 *      tidbits={tidbits}
 *   />
 *
 * License: MIT
 * Repository: https://github.com/attogram/react-tidbits
 */

'use strict';

const TidbitsVersion = '0.0.6';

class Tidbits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current : 0,
            interval: this.props.interval ? this.props.interval : 5000,
            order: this.props.order ? this.props.order : 'ordered',
            tidbits : this.props.tidbits ? this.props.tidbits : ['404 Tidbits Not Found'],
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
        let next;
        switch (this.state.order) {
            default:
            case 'random':
                next = Math.floor(Math.random() * (this.state.tidbits.length));
                break;
            case 'ordered':
                if (this.state.current === this.state.tidbits.length) {
                    next = 0;
                    break;
                }
                next = this.state.current + 1;
                break;
        }

        this.setState({
            current: next
        });
    }

    render() {
        return this.state.tidbits[this.state.current];
    }
}
