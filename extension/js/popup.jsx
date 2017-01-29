import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import {execute, getCurrentTab} from './utils.js';
import PopupComp from './popupComp.jsx';

(function (){

    function enableDS(siteId, metaSiteId){
        getCurrentTab().then(tab => {
            var execRes = /\?(.*)/.exec(tab.url);
            var params = execRes ? ('&' + execRes[1]) : '';
            window.open(
                'http://editor.wix.com/html/editor/web/renderer/render/document/' +
                siteId +
                '?isEdited=true&isSantaEditor=true&dsOrigin=Editor1.4&lang=en&metaSiteId=' +
                metaSiteId + params,'_blank');
        });
    }

    function popupComponentResolver(params){
        if (!_.get(params, 'siteId')) {
            return (<div id="not-wix">
                <p>{"Not Wix"}</p>
            </div>);
        }

        if (!params.hasDS) {
            return (<div id="ds-enabler">
                <p>{"DS must be enabled"}</p>
                <div className="button" onClick={_.partial(enableDS, params.siteId, params.metaSiteId)}>
                    <p>{"Enable"}</p>
                </div>
            </div>);
        }

        return <PopupComp {...params}/>;
    }

    function startPopup(){
        execute("GET_SITE_IDENTIFIERS").then(response => {
            var component = popupComponentResolver(response);
            document.querySelector("#spinnerContainer").classList.add('hidden');
            render(component, document.querySelector("#popupContainer"));
        });
    }

    function waitForWixSiteToLoad(){
        document.querySelector("#spinnerContainer").classList.remove('hidden');
        var retries = 30;
        var siteLoadIntervalHandle = null;

        function trySite(){
            execute("IS_READY").then(isReady => {
                if(isReady || retries < 0){
                    clearInterval(siteLoadIntervalHandle);
                    return startPopup();
                }
                retries--;
            });
        }

        trySite();
        siteLoadIntervalHandle = setInterval(trySite, 1000);
    }

    waitForWixSiteToLoad();
})();



