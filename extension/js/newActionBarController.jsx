import {execute} from './utils.js';
import React from 'react';
import Toggle from './toggle.jsx';
import * as qabDataGenerator from './qabDataGenerator.js';

class NewActionBarController extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'NewActionBarController';
    }

    setBlackColorScheme() {execute('documentServices.mobile.actionBar.v2.appearance.set', {colorScheme: 'black'});}
    setGreyColorScheme() {execute('documentServices.mobile.actionBar.v2.appearance.set', {colorScheme: 'grey'});}
    setBrandColorScheme() {execute('documentServices.mobile.actionBar.v2.appearance.set', {colorScheme: 'brand'});}
    setInvertColorOn() {execute('documentServices.mobile.actionBar.v2.appearance.set', {invertColors: true});}
    setInvertColorOff() {execute('documentServices.mobile.actionBar.v2.appearance.set', {invertColors: false});}
    setHideTextOn() {execute('documentServices.mobile.actionBar.v2.appearance.set', {hideText: true});}
    setHideTextOff() {execute('documentServices.mobile.actionBar.v2.appearance.set', {hideText: false});}
    setDividersOn() {execute('documentServices.mobile.actionBar.v2.appearance.set', {dividers: true});}
    setDividersOff() {execute('documentServices.mobile.actionBar.v2.appearance.set', {dividers: false});}
    setAnchoredSkin() {execute('documentServices.mobile.actionBar.v2.appearance.set', {skin: 'anchored'});}
    setRectSkin() {execute('documentServices.mobile.actionBar.v2.appearance.set', {skin: 'rect'});}
    setOvalSkin() {execute('documentServices.mobile.actionBar.v2.appearance.set', {skin: 'oval'});}
    setFloatSkin() {execute('documentServices.mobile.actionBar.v2.appearance.set', {skin: 'float'});}
    setAlignmentLeft() {execute('documentServices.mobile.actionBar.v2.appearance.set', {alignment: 'left'});}
    setAlignmentRight() {execute('documentServices.mobile.actionBar.v2.appearance.set', {alignment: 'right'});}

    addRandomAction() {
        execute('documentServices.mobile.actionBar.v2.actions.set', {
            href: 'http://www.facebook.com/spongebob',
            type: 'custom',
            text: qabDataGenerator.getRandomText(),
            icon: qabDataGenerator.getRandomSvgHash(),
            color: qabDataGenerator.getRandomColor()
        });
    }

    removeRandomAction() {
        execute('GET_MAB_STATE').then(response => {
            console.log(response);
            var randomAction = _.sample(response.actionsV2);
            execute('documentServices.mobile.actionBar.v2.actions.remove', _.get(randomAction, 'id'));
        });
    }

    render () {
        return (<div id="ds-options-container">
            <div className="controlBox">
                <span>{"Skin:"}</span>
                <div className="button" onClick={this.setAnchoredSkin}><i className="fa fa-anchor"></i></div>
                <div className="button" onClick={this.setRectSkin}><i className="fa fa-square-o"></i></div>
                <div className="button" onClick={this.setOvalSkin}><i className="fa fa-circle-thin"></i></div>
                <div className="button" onClick={this.setFloatSkin}><i className="fa fa-paper-plane"></i></div>
            </div>
            <div className="controlBox">
                <span>{"Color:"}</span>
                <div className="button" style={{color: 'white', backgroundColor: 'black'}} onClick={this.setBlackColorScheme}><i className="fa fa-paint-brush"></i></div>
                <div className="button" style={{color: 'white', backgroundColor: 'grey'}} onClick={this.setGreyColorScheme}><i className="fa fa-paint-brush"></i></div>
                <div className="button" style={{color: 'white', backgroundColor: 'steelblue'}} onClick={this.setBrandColorScheme}><i className="fa fa-paint-brush"></i></div>
            </div>
            <div className="controlBox">
                <span>{"Invert:"}</span>
                <div className="button" onClick={this.setInvertColorOn}>On</div>
                <div className="button" onClick={this.setInvertColorOff}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Text:"}</span>
                <div className="button" onClick={this.setHideTextOff}>On</div>
                <div className="button" onClick={this.setHideTextOn}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Dividers:"}</span>
                <div className="button" onClick={this.setDividersOn}>On</div>
                <div className="button" onClick={this.setDividersOff}>Off</div>
            </div>
            <div className="controlBox">
                <span>{"Align:"}</span>
                <div className="button" onClick={this.setAlignmentLeft}><i className="fa fa-chevron-left"></i></div>
                <div className="button" onClick={this.setAlignmentRight}><i className="fa fa-chevron-right"></i></div>
            </div>
            <div className="controlBox">
                <span>{"Actions:"}</span>
                <div className="button" onClick={this.addRandomAction}><i className="fa fa-plus"></i></div>
                <div className="button" onClick={this.removeRandomAction}><i className="fa fa-minus"></i></div>
            </div>
        </div>);
    }
}

export default NewActionBarController;
