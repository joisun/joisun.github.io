"use strict";
function handleFile() {
    var _a;
    const input = document.getElementById('svgInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('svgTextarea').value = e.target.result;
    };
    // Update the selected file name
    selectedFileName.textContent = ((_a = input.files[0]) === null || _a === void 0 ? void 0 : _a.name) || 'No file selected';
    reader.readAsText(input.files[0]);
}
function convertToBase64() {
    const svgInput = document.getElementById('svgTextarea').value.trim();
    if (!svgInput) {
        alert('Please provide SVG content');
        return;
    }
    try {
        const base64String = btoa(svgInput);
        displayResult(base64String);
    }
    catch (error) {
        alert('Error converting SVG to Base64');
        console.error(error);
    }
}
function displayResult(base64String) {
    displayBase64Result(base64String);
    displayDataUrlResult(base64String);
    displayImgResult(base64String);
}
function clearResultContainer(resultContainerId) {
    const resultContainer = document.getElementById(resultContainerId);
    resultContainer.textContent = '';
}
function displayBase64Result(base64String) {
    clearResultContainer('resultBase64');
    const resultContainer = document.getElementById('resultBase64');
    resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(createResultTitle('Base64 Result:'));
    const resultTextArea = createAndAppendTextArea(base64String);
    resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(resultTextArea);
    createCopyButton(resultTextArea, 'resultBase64');
}
function displayDataUrlResult(base64String) {
    clearResultContainer('resultDataUrl');
    const resultContainer = document.getElementById('resultDataUrl');
    resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(createResultTitle('Data URL Result:'));
    const dataUrl = `data:image/svg+xml;base64,${base64String}`;
    const resultTextArea = createAndAppendTextArea(dataUrl);
    resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(resultTextArea);
    createCopyButton(resultTextArea, 'resultDataUrl');
}
function displayImgResult(base64String) {
    clearResultContainer('resultImg');
    const resultContainer = document.getElementById('resultImg');
    resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(createResultTitle('Image Result:'));
    const imgElement = document.createElement('img');
    imgElement.src = `data:image/svg+xml;base64,${base64String}`;
    const resultTextArea = createAndAppendTextArea(`<img src="${imgElement.src}" alt="SVG Image">`);
    resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(resultTextArea);
    createCopyButton(resultTextArea, 'resultImg');
}
function createResultTitle(title) {
    const resultTitle = document.createElement('div');
    resultTitle.textContent = title;
    resultTitle.classList.add('result-title');
    return resultTitle;
}
function createAndAppendTextArea(value) {
    const resultTextArea = document.createElement('textarea');
    resultTextArea.setAttribute('readonly', 'true');
    resultTextArea.setAttribute('rows', '5');
    resultTextArea.value = value;
    return resultTextArea;
}
function createCopyButton(elementToCopy, resultContainerId) {
    var _a;
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.onclick = function () {
        copyToClipboard(elementToCopy);
    };
    (_a = document.getElementById(resultContainerId)) === null || _a === void 0 ? void 0 : _a.appendChild(copyButton);
}
function copyToClipboard(element) {
    const textArea = document.createElement('textarea');
    textArea.value = element.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Copied to clipboard!');
}
