const { app, BrowserWindow, globalShortcut, Menu, Tray } = require("electron");
const path = require("path");

let windowShown = false;
let window = null

let BigWindow = null;

let tray = null;

app.on('ready', ()=>{
    window = createWindow();
});

function createWindow(){
    const nWindow = new BrowserWindow({
        width: 600,
        height: 800,
        show: false,
        alwaysOnTop: true,
        autoHideMenuBar: true
    })
    Menu.setApplicationMenu(null);
    nWindow.loadURL("https://chatgpt.com")
    return nWindow
}

function CreateBigWindow(){
    const nWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true
    })
    Menu.setApplicationMenu(null);
    nWindow.loadURL("https://chatgpt.com")
    nWindow.on('closed', () => {
        BigWindow = null;
    })
    return nWindow
}

app.on("window-all-closed", (event)=>{
    event.preventDefault()
});

app.on("ready", ()=>{
    globalShortcut.register('Alt+Space', ()=>{
        if(windowShown) {
            window.hide()
        }else{
            window.show()
        }
        windowShown = !windowShown
    })

    const iconPath = path.join(__dirname, 'resources', 'logo.png');
    tray = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show/Hide ChatGPT", click: () => {
                // Create the big window
                if(BigWindow !== null){
                    BigWindow.close()
                }else{
                    BigWindow = CreateBigWindow();
                }
            }
        },
        {
            label: "Quit", click: () => {
                app.quit();
            }
        }
    ])

    tray.setToolTip("ChatGPT");
    tray.setContextMenu(contextMenu);
});