"use strict";
module.exports = function (nodecg) {
    const server = 'server';
    const web = 'web';
    const hostChecklistItems = nodecg.Replicant("host-checklist-items");

    nodecg.listenFor(`${server}-button-toggle`, (data) => {
        nodecg.sendMessage(`${web}-button-toggle`, data);
        let newData = hostChecklistItems.value;
        if (newData[data.id-1] && newData[data.id-1] !== undefined) {
            newData[data.id-1]["checked"] = data.checked;
            hostChecklistItems.value = newData;
        }
    });

    nodecg.listenFor(`${server}-reset-checklist`, (data) => {
        nodecg.sendMessage(`${web}-reset-checklist`, data);
    });
}