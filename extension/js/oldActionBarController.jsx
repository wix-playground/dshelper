import {execute} from './utils.js';
import React from 'react';
import Toggle from './toggle.jsx';
import * as qabDataGenerator from './qabDataGenerator.js';

class OldActionBarController extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'OldActionBarController';
        this.state = {
            actionBarData: {version: 1}
        }
    }

    // -------- Common --------------------------------------------------------------------------------------------
    enableMab() {execute('documentServices.mobile.actionBar.enable', true);}
    disableMab() {execute('documentServices.mobile.actionBar.enable', false);}
    upgrade() {execute('documentServices.mobile.actionBar.version.set', 2);}

    // -------- Old MAB -------------------------------------------------------------------------------------------

    setColorToDark() {execute('documentServices.mobile.actionBar.colorScheme.set', 'dark');}
    setColorToLight() {execute('documentServices.mobile.actionBar.colorScheme.set', 'light');}
    enableNavigation() {execute('documentServices.mobile.actionBar.actions.enable', {navigationMenu: true});}
    disableNavigation() {execute('documentServices.mobile.actionBar.actions.enable', {navigationMenu: false});}

    enablePhone() {
        execute('documentServices.mobile.actionBar.actions.update', {phone: '111-222-33-44'})
            .then(() => execute('documentServices.mobile.actionBar.actions.enable', {phone: true}));
    }
    disablePhone() {execute('documentServices.mobile.actionBar.actions.enable', {phone: false});}

    enableEmail() {
        execute('documentServices.mobile.actionBar.actions.update', {email: 'spongebob@wix.com'})
            .then(() => execute('documentServices.mobile.actionBar.actions.enable', {email: true}));
    }
    disableEmail() {execute('documentServices.mobile.actionBar.actions.enable', {email: false});}

    enableAddress() {
        execute('documentServices.mobile.actionBar.actions.update', {address: 'hanamal 40 floor 6'})
            .then(() => execute('documentServices.mobile.actionBar.actions.enable', {address: true}));
    }
    disableAddress() {execute('documentServices.mobile.actionBar.actions.enable', {address: false});}

    enableSocialLinks() {
        execute('documentServices.mobile.actionBar.actions.update', {
            socialLinks: {
                facebook: 'http://www.facebook.com/spongebob',
                twitter: 'http://www.twitter.com/spongebob'
            }
        }).then(() => execute('documentServices.mobile.actionBar.actions.enable', {socialLinks: true}));
    }
    disableSocialLinks() {execute('documentServices.mobile.actionBar.actions.enable', {socialLinks: false});}

    // -------- QR code -------------------------------------------------------------------------------------------

    setQR(){
        execute('GET_MAB_STATE').then(response => {
            this.setState({
                actionBarData: response
            });
        });
    }

    generateQRData(){
        var qrApi = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
        var qabState = {
            version: this.state.actionBarData.version,
            appearance: _.get(this.state.actionBarData, 'appearance'),
            actions: _.get(this.state.actionBarData, 'actionsV2'),
            isEnabled: _.get(this.state.actionBarData, 'isEnabled')
        };
        var params = '?ReactSource=http://localhost&qabdata=' + encodeURIComponent(JSON.stringify(_.pickBy(qabState)));
        return qrApi + encodeURIComponent(this.props.url + params);
    }

    render () {
        return (<div id="ds-options-container">
            <div className="controlBox">
                <span>{"Version:"}</span>
                <div className="button" onClick={this.upgrade}>Upgrade</div>
            </div>
            <div className="controlBox">
                <span>{"Enable:"}</span>
                <div className="button" onClick={this.enableMab}>On</div>
                <div className="button" onClick={this.disableMab}>Off</div>
            </div>
            <div className="spacer">Old</div>
            <div className="controlBox">
                <span>{"Colors:"}</span>
                <div className="button" style={{color: 'white', backgroundColor: 'dimgray'}} onClick={this.setColorToDark}><i className="fa fa-paint-brush"></i></div>
                <div className="button" style={{color: 'dimgray', backgroundColor: 'white'}} onClick={this.setColorToLight}><i className="fa fa-paint-brush"></i></div>
            </div>
            <div className="controlBox">
                <span>{"Nav:"}</span>
                <div className="button" onClick={this.enableNavigation}>On</div>
                <div className="button" onClick={this.disableNavigation}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Phone:"}</span>
                <div className="button" onClick={this.enablePhone}>On</div>
                <div className="button" onClick={this.disablePhone}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Email:"}</span>
                <div className="button" onClick={this.enableEmail}>On</div>
                <div className="button" onClick={this.disableEmail}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Address:"}</span>
                <div className="button" onClick={this.enableAddress}>On</div>
                <div className="button" onClick={this.disableAddress}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Social:"}</span>
                <div className="button" onClick={this.enableSocialLinks}>On</div>
                <div className="button" onClick={this.disableSocialLinks}>Off</div>
            </div>
            <div className="spacer">QR Generator</div>
            <div className="controlBox">
                <span>{"Generate:"}</span>
                <div className="button" onClick={this.setQR.bind(this)}><i className="fa fa-qrcode"></i></div>
            </div>
            <div className="qr-frame-container" style={{backgroundColor: qabDataGenerator.getRandomColor()}}>
                <iframe
                    className="qr-frame"
                    src={this.generateQRData()}
                    frameBorder="0">
                </iframe>
            </div>
        </div>);
    }
}

export default OldActionBarController;
