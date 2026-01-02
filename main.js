const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        resizable: true,
        icon: path.join(__dirname, 'icon.ico')
    });

    mainWindow.loadFile('index.html');

    // 개발 시 개발자 도구 열기 (배포 시에는 주석 처리)
    // mainWindow.webContents.openDevTools();

    // 메뉴바 숨기기 (선택사항)
    mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
