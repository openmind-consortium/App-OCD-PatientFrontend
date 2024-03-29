/* eslint-env node */
const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();

const { dirname, join, resolve } = require('path');
const protocolServe = require('electron-protocol-serve');
const sendAndReceive = require('./zmq-client')

let mainWindow = null;

// Registering a protocol & schema to serve our Ember application
protocol.registerSchemesAsPrivileged([
  { scheme: 'serve', privileges: { standard: true, secure: true, supportFetchAPI: true } }
]);
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember-dist'),
  app,
  protocol,
});

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/
// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // If you want to open up dev tools programmatically, call
  // mainWindow.openDevTools();

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  mainWindow.loadURL(emberAppLocation);

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.webContents.on('crashed', () => {
    console.log('Your Ember app (or other code) in the main window has crashed.');
    console.log('This is a serious issue that needs to be handled and/or debugged.');
  });

  mainWindow.on('unresponsive', () => {
    console.log('Your Ember app (or other code) has made the window unresponsive.');
  });

  mainWindow.on('responsive', () => {
    console.log('The main window has become responsive again.');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// IPC Communication
const error_message = '{"message_type": "result", "message": "error", "payload": {"status": false", "error-code": -1, "error-message": "zmq error"}}'

// receive requests
ipcMain.on('request', (event, args) => {
  sendAndReceive(args)
    .then((res) => {
      event.reply('response', res)
    })
    .catch((err) => {
      event.reply('response', JSON.stringify({
        message_type: "result",
        message: "error",
        payload: {
          status: false,
          error_code: -1,
          error_message: err
        }
      }));
      console.log("Error caught in return ipc message from Summit API")
      console.log(err)
    })
})

// Functions to launch jsPsych tasks 

const execa = require('execa')

ipcMain.on('taskSpawn', (event, args) => {
  const home = app.getPath('home');
  const fullPath = path.join(home, 'AppData', 'Local', args.taskPath) 
  execa(fullPath, 
    {
      env: { 
        REACT_APP_AT_HOME: true
      }
    }).stdout.pipe(process.stdout)
})

// Handle an unhandled error in the main thread
//
// Note that 'uncaughtException' is a crude mechanism for exception handling intended to
// be used only as a last resort. The event should not be used as an equivalent to
// "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
// an undefined state. Attempting to resume application code without properly recovering
// from the exception can cause additional unforeseen and unpredictable issues.
//
// Attempting to resume normally after an uncaught exception can be similar to pulling out
// of the power cord when upgrading a computer -- nine out of ten times nothing happens -
// but the 10th time, the system becomes corrupted.
//
// The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
// resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
// not safe to resume normal operation after 'uncaughtException'.
process.on('uncaughtException', (err) => {
  console.log('An exception in the main thread was not handled.');
  console.log('This is a serious issue that needs to be handled and/or debugged.');
  console.log(`Exception: ${err}`);
});
