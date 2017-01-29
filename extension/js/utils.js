import _ from 'lodash';

function getCurrentTab(){
    return (new Promise(resolve => chrome.tabs.getSelected(null, resolve)));
}

function execute() {
    var message = arguments[0];
    var params = _.slice(arguments, 1);
    return getCurrentTab()
        .then(tab => new Promise(resolve => chrome.tabs.sendMessage(tab.id, {message, params}, resolve)));
}

export {
    execute,
    getCurrentTab
};






