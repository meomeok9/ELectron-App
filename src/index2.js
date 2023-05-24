const { app , ipcMain, BrowserWindow, Menu} = require("electron");
const path = require('path');
let mainWindow,subWindow;

const createWindow =(height,width,isOpenDevTools = false)=>{
    mainWindow = new BrowserWindow({
     width: width,
     height: height,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         preload: path.join(__dirname, 'preload.js'),
       },
     });
     mainWindow.loadFile(path.join(__dirname, 'index2.html'));
     const mainMenu = Menu.buildFromTemplate(menuTemplate);
     Menu.setApplicationMenu(mainMenu);
     if(isOpenDevTools)
     mainWindow.webContents.openDevTools();
     
 }

app.on('ready',()=>{
    createWindow(600,800);
});

const menuTemplate =[
    {
        label: "File",
        submenu: [
            {
                label: 'New Todo',
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                }
            },
        ]
    },
];

if(process.platform ==='darwin'){
    menuTemplate.unshift({});
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });