const { app, BrowserWindow } = require('electron/main')
const path = require('path')
const fs = require("fs");

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


const directoryPath = 'C:\\app\\Code\\Frontent\\ev\\src\\components';

fs.readdir(directoryPath, { withFileTypes: true,recursive:true }, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    console.log(files)

    const directories = files.filter(file => file.isDirectory()).map(directory => directory.name);
    console.log('Subdirectories:', directories);
});

// 使用 fs.readFile 读取文件内容
fs.readFile('C:\\app\\Code\\Frontent\\ev\\src\\components\\TheWelcome.vue', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

