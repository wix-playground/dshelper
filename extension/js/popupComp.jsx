import React from 'react';
import OldActionBarController from './oldActionBarController.jsx';
import NewActionBarController from './newActionBarController.jsx';

class PopupComp extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'Popup';
    }

    render () {
        return (<div id="popup-root">
            {false && <h1>ds helper</h1>}
            <OldActionBarController {...this.props}/>
            <div className="v-spacer"></div>
            <NewActionBarController {...this.props}/>
        </div>);
    }
}

export default PopupComp;
