const { app , ipcMain, BrowserWindow, Menu} = require("electron");
const path = require('path');
let mainWindow,subWindow,mainPlasform;
const mainObjWd ={
    window:mainWindow,
    isMain:true,
}
const subObjWd ={
    window:subWindow,
    isMain:false,
}
const createWindow =(window,page = null,isGotMenu = false,height=600,width=800,title='window',openDevTools = process.env.NODE_ENV !=='production')=>{
    let mainMenu;
    window.window = new BrowserWindow({
     width,
     height,
     title,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         preload: path.join(__dirname, 'preload.js'),
       },
     });
      if(page) window.window.loadFile(path.join(__dirname, page));
      if(openDevTools) menuTemplate.push({
        label:"View",
        submenu:[
            {role :"reload"},
            {
                label:'Toggle Deverloper Tools',
                accelerator: mainPlasform==='darwin'? 'Command+Alt+I':'ctrl+shift+i',
                click(item,focusWindow){
                    focusWindow.toggleDevTools();
                }
            }
        ]
      })
     if(isGotMenu){
        mainMenu = Menu.buildFromTemplate(menuTemplate);
         Menu.setApplicationMenu(mainMenu);
     }
     if(window.isMain)
        window.window.on('closed',()=>app.quit());
    //don rac
     window.window.on('closed',()=>window.window = null);
 }

 ipcMain.on('todo:add',(event,todo)=>{
    console.log('#1 todo : ',todo);
    mainObjWd.window.webContents.send('todo:add',todo);
    subObjWd.window.close();
 });

app.on('ready',()=>{
    mainPlasform = process.platform;
    createWindow(mainObjWd,'index2.html',true);
   
});

const menuTemplate =[
    {
        label: "File",
        submenu: [
            {
                label: 'New Todo',
                click(){
                    createWindow(subObjWd,'addTodo.html',false,300,400,'Add Todo');
                }
            },
            {
                label: 'Clear Todo',
                click(){
                    mainObjWd.window.send('todo:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: mainPlasform==='darwin'? 'Command+Q':'ctrl+q',
                click(){
                    app.quit();
                }
            },
        ]
    },
]


if(mainPlasform ==='darwin'){
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