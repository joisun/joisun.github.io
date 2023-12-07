function handleFile() {
    const input = <HTMLInputElement>document.getElementById('svgInput');
    const selectedFileName = <HTMLDivElement>document.getElementById('selectedFileName');
    const reader = new FileReader();

    reader.onload = function (e) {
        (<HTMLTextAreaElement>document.getElementById('svgTextarea')).value = e.target.result as string;
    };


    // Update the selected file name
    selectedFileName.textContent = input.files[0]?.name || 'No file selected';

    reader.readAsText(input.files[0]);
}

function convertToBase64() {
    const svgInput = (<HTMLTextAreaElement>document.getElementById('svgTextarea')).value.trim();

    if (!svgInput) {
        alert('Please provide SVG content');
        return;
    }

    try {
        const base64String = btoa(svgInput);
        displayResult(base64String);
    } catch (error) {
        alert('Error converting SVG to Base64');
        console.error(error);
    }
}

function displayResult(base64String: string) {
    displayBase64Result(base64String);
    displayDataUrlResult(base64String);
    displayImgResult(base64String);
}

function clearResultContainer(resultContainerId: string) {
    const resultContainer = document.getElementById(resultContainerId);
    resultContainer.textContent = '';
}

function displayBase64Result(base64String: string) {
    clearResultContainer('resultBase64');

    const resultContainer = document.getElementById('resultBase64');
    resultContainer?.appendChild(createResultTitle('Base64 Result:'));

    const resultTextArea = createAndAppendTextArea(base64String);
    resultContainer?.appendChild(resultTextArea);

    createCopyButton(resultTextArea, 'resultBase64');
}

function displayDataUrlResult(base64String: string) {
    clearResultContainer('resultDataUrl');

    const resultContainer = document.getElementById('resultDataUrl');
    resultContainer?.appendChild(createResultTitle('Data URL Result:'));

    const dataUrl = `data:image/svg+xml;base64,${base64String}`;
    const resultTextArea = createAndAppendTextArea(dataUrl);
    resultContainer?.appendChild(resultTextArea);

    createCopyButton(resultTextArea, 'resultDataUrl');
}

function displayImgResult(base64String: string) {
    clearResultContainer('resultImg');

    const resultContainer = document.getElementById('resultImg');
    resultContainer?.appendChild(createResultTitle('Image Result:'));

    const imgElement = document.createElement('img');
    imgElement.src = `data:image/svg+xml;base64,${base64String}`;
    const resultTextArea = createAndAppendTextArea(`<img src="${imgElement.src}" alt="SVG Image">`);
    resultContainer?.appendChild(resultTextArea);

    createCopyButton(resultTextArea, 'resultImg');
}

function createResultTitle(title: string): HTMLElement {
    const resultTitle = document.createElement('div');
    resultTitle.textContent = title;
    resultTitle.classList.add('result-title');

    return resultTitle;
}

function createAndAppendTextArea(value: string): HTMLTextAreaElement {
    const resultTextArea = document.createElement('textarea');
    resultTextArea.setAttribute('readonly', 'true');
    resultTextArea.setAttribute('rows', '5');
    resultTextArea.value = value;

    return resultTextArea;
}

function createCopyButton(elementToCopy: HTMLTextAreaElement, resultContainerId: string) {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.onclick = function () {
        copyToClipboard(elementToCopy);
    };

    document.getElementById(resultContainerId)?.appendChild(copyButton);
}

function copyToClipboard(element: HTMLTextAreaElement) {
    const textArea = document.createElement('textarea');
    textArea.value = element.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Copied to clipboard!');
}
