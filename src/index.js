const { app, BrowserWindow ,ipcMain, autoUpdater } = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
// const { exec , spawn} = require('child_process');

if (require('electron-squirrel-startup')) {
  app.quit();
}
let mainWindow;
const createWindow =()=>{
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    mainWindow.loadFile(path.join(__dirname, 'idex.html'));
    mainWindow.webContents.openDevTools();
}
app.on('ready',()=>{
  createWindow();
});
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
ipcMain.on('video:submit',(event, path)=>{
  ffmpeg.setFfprobePath("D:\\resource\\ffmpeg\\ffmpeg-2023-05-22-git-877ccaf776-essentials_build\\bin\\ffprobe.exe");
  ffmpeg.ffprobe(path, (err, metadata)=>{
    if(metadata)
    {
      console.log(metadata.format.duration);
      mainWindow.webContents.send("video:metadata", metadata.format.duration);
    }
  })
})

//------------------------------------ old code -----------------------------------------------------------


// const programToLock = 'C:\\Users\\SAM2\\AppData\\Local\\Programs\\super-changer-desktop\\SuperChanger.exe';
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }


// const createWindow = () => {
//   // Create the browser window.
//   // const mainWindow = new BrowserWindow({
//     //   width: 800,
//     //   height: 600,
    
//     //   webPreferences: {
//       //     preload: path.join(__dirname, 'preload.js'),
//       //   },
//       // });
      
//       // // // and load the index.html of the app.
//       // mainWindow.loadFile(path.join(__dirname, 'index.html'));
//       // // spawn(applicationPath);
//      let mainWindow = spawn(programToLock);
      

//      const hiddenWindow = new BrowserWindow({ show: false });
//      if (mainWindow.pid) {
//   hiddenWindow.webContents.once('did-finish-load', () => {
//     mainWindow.stdout.pipe(hiddenWindow.webContents);
//     mainWindow.stderr.pipe(hiddenWindow.webContents);
//   });
//   mainWindow.on('close', () => {
//     try{
//       mainWindow = null;
//       hiddenWindow.close();
//     }catch(err){}
//   });
//   }
  
//   exec('tasklist', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing command: ${err}`);
//       return;
//     }
    
//     let appId ="";
//     // Parse the output of the command and filter for 'notepad.exe'
//     appId = stdout.split('\n').slice(3).map(line => { 
//       const parts = line.trim().split(/\s+/);
//       return {
//         imageName: parts[0],
//         pid: parts[1],
//         windowsTitle: parts.slice(8).join(' ')
//       };
//     }).filter(p => p.imageName.toLowerCase() === programToLock);
     
//     // Log the window IDs of all matching Notepad.exe processes
   
//     const overlayWindow = new BrowserWindow({
//       width :1200,
//       height : 900,
//       parent: appId.pid,
//       modal: true,
//       frame: false,
//       id: 'overlay-window',
//       alwaysOnTop:true,
//       minimizable:false,
//       focusable:true,
//       resizable: false,
//       webPreferences: {
//         nodeIntegration: true
//       }
//     })
   

//    // show the child window on top of the main window
//     overlayWindow.loadFile(path.join(__dirname, 'index.html'));

//     ipcMain.on('message-from-renderer', (event, arg) => {
//       console.log(arg); // Log the message received from the renderer process
//     });
 
//     overlayWindow.on("close",()=>{
//       if (process.platform !== 'darwin') {
//         mainWindow.kill();
//         app.quit();
//       }
//     })
    
//     overlayWindow.webContents.openDevTools();
//     overlayWindow.show();
//   });


//   // Open the DevTools.
//   //mainWindow.webContents.openDevTools();
//  };

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready',()=>{
//   createWindow();
// });

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {

//     createWindow();
//   }
// });

