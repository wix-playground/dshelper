import React from 'react';

class Toggle extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'toggle';
    }

    render () {
        return (<div className="toggle">
            <i
                className={this.props.isActive ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}
                onClick={this.props.action}
                style={{color: this.props.isActive ? 'green' : 'grey'}}>
            </i>
            <span>{this.props.text}</span>
        </div>);
    }
}

export default Toggle;
