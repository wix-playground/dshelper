(function () {
    function generateCommandJS(command) {
        switch (command.type) {
            case 'PROP':
                return 'try {res.' + command.key + ' = window.' + command.name + '} catch(err){}';

            case 'FUNC':
                return (command.key)
                    ? 'try {res.' + command.key + ' = window.' + command.name + '.apply(null, JSON.parse(\'' + JSON.stringify(command.params) + '\'))} catch(err){}'
                    : 'try {window.' + command.name + '.apply(null, JSON.parse(\'' + JSON.stringify(command.params) + '\'))} catch(err){}';

            case 'EXIST':
                return 'try {res.' + command.key + ' = !!window.' + command.name + '} catch(err){}';

            case 'DEBUGGER':
                return 'debugger';
        }
    }

    function generateScriptJS(commands) {
        var scriptContent = '(function(){\n';
        scriptContent += '\tvar res = {};\n';

        commands.forEach(function (c) {
            scriptContent += '\t' + generateCommandJS(c) + ';\n';
        });

        scriptContent += '\tdocument.body.dataset.globalVarForExtraction = JSON.stringify(res);\n';
        scriptContent += '})();';
        return scriptContent;
    }

    function executeInSite(commands) {
        var scriptContent = generateScriptJS(commands);
        var script = document.createElement('script');
        script.id = 'dsHelperVariableExtractionScript';
        script.appendChild(document.createTextNode(scriptContent));
        document.body.appendChild(script);
        var retval = JSON.parse(document.body.dataset.globalVarForExtraction);
        document.getElementById('dsHelperVariableExtractionScript').remove();
        delete document.body.dataset.globalVarForExtraction;
        return retval;
    }

    function runtimeMessageHandler(request, sender, sendResponse) {
        switch (request.message) {
            case 'GET_SITE_IDENTIFIERS' :
                sendResponse(executeInSite([
                    {type: 'PROP', key: 'siteId', name: 'rendererModel.siteInfo.siteId'},
                    {type: 'PROP', key: 'metaSiteId', name: 'rendererModel.metaSiteId'},
                    {type: 'EXIST', key: 'hasDS', name: 'documentServices'},
                    {type: 'FUNC', name: 'documentServices.generalInfo.getPublicUrl', key: 'url', params: []}
                ]));
                return;

            case 'IS_READY' :
                sendResponse(!!isReady);
                return;

            case 'documentServices.mobile.actionBar.enable' :
            case 'documentServices.mobile.actionBar.version.set':
            case 'documentServices.mobile.actionBar.colorScheme.set' :
            case 'documentServices.mobile.actionBar.actions.enable' :
            case 'documentServices.mobile.actionBar.actions.update' :
            case 'documentServices.mobile.actionBar.v2.appearance.set':
            case 'documentServices.mobile.actionBar.v2.actions.set':
            case 'documentServices.mobile.actionBar.v2.actions.remove':
                executeInSite([
                    {type: 'FUNC', name: request.message, params: request.params}
                ]);
                return;

            case 'GET_MAB_STATE' :
                sendResponse(executeInSite([
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.isEnabled', key: 'isEnabled', params: []},
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.version.get', key: 'version', params: []},
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.colorScheme.get', key: 'colorScheme', params: []},
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.v2.appearance.get', key: 'appearance', params: []},
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.actions.getEnabled', key: 'enabledActions', params: []},
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.actions.get', key: 'actions', params: []},
                    {type: 'FUNC', name: 'documentServices.mobile.actionBar.v2.actions.get', key: 'actionsV2', params: []}
                ]));
                return;
        }
    }

    function windowMessageHandler(e){
        if(e.data === 'documentServicesLoaded' || e.data === 'santaReady'){
            isReady = true;
        }
    }

    var isReady = false;
    chrome.runtime.onMessage.addListener(runtimeMessageHandler);
    window.addEventListener('message', windowMessageHandler);
})();
