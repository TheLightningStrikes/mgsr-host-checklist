window.addEventListener('DOMContentLoaded', () => {
    const server = 'server';
    const web = 'web';

    const hostChecklistItems = nodecg.Replicant("host-checklist-items");

    const amountOfCheckboxes = document.getElementsByTagName('input').length;

    NodeCG.waitForReplicants(hostChecklistItems).then(() => {
        for (let dataID in hostChecklistItems.value) {
            let checkbox = document.getElementById("checkbox-"+hostChecklistItems.value[dataID]["id"]);
            let listItem = document.getElementById("list-item-"+hostChecklistItems.value[dataID]["id"]);
            checkbox.checked = hostChecklistItems.value[dataID]["checked"];
            if (checkbox.checked) {
                listItem.classList.add("checked");
            }
            else {
                listItem.classList.remove("checked");
            }
        }

        console.log(hostChecklistItems.value);
        if (hostChecklistItems.value === undefined) {
            data = [];
            for (let i = 1; i <= amountOfCheckboxes; i++) {
                data[i-1] = {"checked": false, "id": i};
            }
            hostChecklistItems.value = data;
        }

        nodecg.listenFor(`${web}-button-toggle`, (data) => {
            let checkbox = document.getElementById(data.checkboxId);
            let listItem = document.getElementById(data.listItemId)
            checkbox.checked = data.checked;
            if (data.checked) {
                listItem.classList.add("checked");
            }
            else {
                listItem.classList.remove("checked");
            }
        });

        nodecg.listenFor(`${web}-reset-checklist`, () => {
            reset();
        });
    });

    for (let i = 1; i <= amountOfCheckboxes; i++) {
        let checkbox = document.getElementById("checkbox-"+i);
        checkbox.onclick = () => {
            let listItem = document.getElementById("list-item-"+i)
            if (checkbox.checked) {
                listItem.classList.add("checked");
            }
            else {
                listItem.classList.remove("checked");
            }
            let data = {};
            data.id = i;
            data.checkboxId = "checkbox-"+i;
            data.listItemId = "list-item-"+i;
            data.checked = checkbox.checked;
            hostChecklistItems.value[i-1] = {"checked": checkbox.checked, "id": i};
            nodecg.sendMessage(`${server}-button-toggle`, data);
        }
    }

    const resetButton = document.getElementById("reset");
    resetButton.onclick = () => {
        reset();
        nodecg.sendMessage(`${server}-reset-checklist`);
    }

    function reset() {
        let data = [];
        for (let i = 1; i <= amountOfCheckboxes; i++) {
            let checkbox = document.getElementById("checkbox-"+i);
            checkbox.checked = false;
            let listItem = document.getElementById("list-item-"+i)
            listItem.classList.remove("checked");
            data[i-1] = {"checked": false, "id": i};
        }
        hostChecklistItems.value = data;
    }
});