/**
 * React Tidbits - show ever-changing content
 *
 *   example:
 *
 *   // interval = milliseconds between changes. 1000 milliseconds = 1 second
 *   const interval = 2000;
 *
 *   // order = "ordered" or "random".  Optional, default is "ordered"
 *   const order = "random";
 *
 *   // pauseOnHover = pause rotation when mouse is over content. Optional, default is true
 *   const pauseOnHover = true;
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
 *      pauseOnHover={pauseOnHover}
 *      tidbits={tidbits}
 *   />
 *
 * License: MIT
 * Repository: https://github.com/attogram/react-tidbits
 */

'use strict';

const TidbitsVersion = '0.0.10';

class Tidbits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            interval: this.props.interval ? this.props.interval : 5000,
            order: this.props.order ? this.props.order : 'ordered',
            tidbits: this.props.tidbits ? this.props.tidbits : ['404 Tidbits Not Found'],
            isPaused: false
        };
        this.tick = this.tick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    startTimer() {
        if (!this.timer) {
            this.timer = setInterval(this.tick, this.state.interval);
        }
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    handleMouseEnter() {
        if (this.props.pauseOnHover !== false) {
            this.setState({ isPaused: true });
            this.stopTimer();
        }
    }

    handleMouseLeave() {
        if (this.props.pauseOnHover !== false) {
            this.setState({ isPaused: false });
            this.startTimer();
        }
    }

    tick() {
        let next;
        switch (this.state.order) {
            default:
            case 'ordered':
                if (this.state.current >= (this.state.tidbits.length - 1)) {
                    next = 0;
                } else {
                    next = this.state.current + 1;
                }
                break;
            case 'random':
                next = Math.floor(Math.random() * (this.state.tidbits.length));
                break;
        }
        this.setState({
            current: next
        });
    }

    render() {
        const containerStyle = {
            cursor: this.props.pauseOnHover !== false ? 'pointer' : 'default',
            position: 'relative',
            display: 'inline-block'
        };

        const pauseIndicatorStyle = {
            position: 'absolute',
            top: '5px',
            right: '0',              // Changed from '5px' to '0'
            padding: '2px 6px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '3px',
            fontSize: '16px',        // Increased from '12px' for better icon visibility
            display: this.state.isPaused ? 'block' : 'none',
            lineHeight: 1,           // Added for better vertical alignment
            userSelect: 'none'       // Prevent text selection of the icon
        };

        return (
            <div 
                style={containerStyle}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.state.tidbits[this.state.current]}
                <span style={pauseIndicatorStyle}>⏸️</span>
            </div>
        );
    }
}
