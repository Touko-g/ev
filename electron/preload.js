const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onGetData: (callback) => ipcRenderer.on('get-data', (_event, value) => callback(value)),
    setData:(value)=>ipcRenderer.send('set-data',value),
    getFileData: () => ipcRenderer.invoke('getFileData')
})
