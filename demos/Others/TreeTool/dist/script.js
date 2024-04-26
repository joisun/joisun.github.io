"use strict";
const $ = (classSelector) => {
    return document.querySelector(classSelector);
};
const requestDeep = 2;
const readDir = async (dir, deep = 1) => {
    const Item = {
        name: dir.name,
        folderList: [],
        fileList: [],
        deep
    };
    const dirEntriesIterator = dir.entries();
    deep++;
    for await (let dirEntry of dirEntriesIterator) {
        let file = dirEntry[1];
        if (file.kind === 'directory' && deep <= requestDeep) {
            Item.folderList.push(await readDir(file, deep));
        }
        else {
            Item.fileList.push(file.name);
        }
    }
    return Item;
};
const openDirBtn = $('#opendir');
openDirBtn.addEventListener("click", async () => {
    const dir = await window.showDirectoryPicker();
    const tree = await readDir(dir);
    console.log('tree', tree);
    const treeString = generateTreeString(tree);
    // console.log(treeString)
});
const generateTreeString = (tree, intend = "", isLast = false) => {
    let fileListString = `└── ${tree.name}`;
    if (tree.fileList.length) {
        for (let i = 0; i < tree.fileList.length; i++) {
            const isLastFile = i === tree.fileList.length;
            const row = `\n${intend + "     "}${isLastFile ? '└── ' : '├── '}${tree.fileList[i]}`;
            fileListString += row;
        }
    }
    let content = '';
    const hasChild = tree.folderList.length !== 0;
    if (hasChild) {
        for (let i = 0; i < tree.folderList.length; i++) {
            const isLast = i === tree.folderList.length;
            const forderContent = generateTreeString(tree.folderList[i], intend + "  ", isLast);
            content += forderContent;
        }
    }
    return fileListString + content;
};
const tree = {
    "name": "Files",
    "folderList": [
        {
            "name": "test_dir_01",
            "folderList": [],
            "fileList": [
                "dir02",
                "dir03",
                "resume.pdf",
                "resume.png",
                "resume20230819.pdf"
            ],
            "deep": 2
        }
    ],
    "fileList": [
        "123.jpg",
        "jayce_Cyberpunk_Cartoon_style_with_short_hear_with_glasses_blac_eae394ea-6f89-4e2d-85b0-dfefaf627de0.png",
        "resume.pdf",
        "resume.png",
        "resume20230819.pdf"
    ],
    "deep": 1
};
const treeString = generateTreeString(tree);
console.log(treeString);
// 生成树形字符串的函数
const generateTreeString2 = (node, indent = '', isLast = true) => {
    const marker = isLast ? '└── ' : '├── ';
    let result = indent + marker + node.name + '\n';
    const childrenCount = node.folderList.length;
    for (let i = 0; i < childrenCount; i++) {
        const isLastChild = i === childrenCount - 1;
        const child = node.folderList[i];
        const childIndent = indent + (isLast ? '    ' : '│   ');
        result += generateTreeString(child, childIndent, isLastChild);
    }
    return result;
};
