const {app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('path')
const fs = require("fs");
const Store = require('electron-store');

const store = new Store();

let win = null

const baseUrl = 'C:\\app\\Code\\Frontent\\ev\\src\\assets\\test'

const result = getAllFiles(baseUrl);

console.log(result)
const replaceObjectValues = (obj) => {
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            replaceObjectValues(obj[key]);
        } else {
            obj[key] = fs.readFileSync(obj[key], 'utf-8')
        }
    }
    return obj
}


store.set('fileData', replaceObjectValues(result))

const fileData = store.get('fileData')

function getAllFiles(dir) {
    const files = {};

    // 获取指定路径下的所有文件和文件夹
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        // 如果是文件，则将文件名添加到结果对象中
        if (stat.isFile()) {
            files[item] = itemPath;
        }
        // 如果是文件夹，则递归调用该函数，并将结果对象添加到当前对象的属性中
        else if (stat.isDirectory()) {
            files[item] = getAllFiles(itemPath);
        }
    });
    return files;
}

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.webContents.openDevTools({mode: "detach"});

    // win.once('ready-to-show', () => {
    //     win.show();
    // });

    ipcMain.on('set-data', (event, value) => {
        if (value) {
            console.log(win, fileData)
            win.webContents.send('get-data', fileData)
        }
    })

    ipcMain.handle('getFileData', () => {
        return fileData
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

