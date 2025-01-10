
import { FramesModal } from "./UI/FramesModal";
import { HTML } from "./UI/Html";
import { Modal } from "./UI/Modal";
import { WindowManager } from "./UI/WindowManager";
import { App } from "./app";


const debug = {
    name: 'Debug',
    x:100,
    y:100,
    w:300,
    h:500
}
const logs = {
    name: 'Logs',
    x:100,
    y:500,
    w:300,
    h:100
}
const logs2 = {
    name: 'Logs2',
    x:100,
    y:500,
    w:300,
    h:100
}
const navigation = {
    name: 'Navigation',
    x:300,
    y:300,
    w:500,
    h:200
}


const testSpan = new HTML('span', 'test', 222, document.body);
const testButton1 = new HTML('button', 'test', 222, document.body);
const testButton2 = new HTML('button', 'test', 222, document.body);


const app  =  new App();
const windowManager = new WindowManager();
const debugWindow = windowManager.addWindow(debug);
const logsWindow = windowManager.addWindow(logs,debugWindow);
const logsWindow2 = windowManager.addWindow(logs2,debugWindow);
const framesModal = new FramesModal(1);
// debugWindow.addContentComponent(logsWindow);
// debugWindow.addContentComponent(logsWindow2);
// logsWindow2.addHtmlElement(testSpan);
// logsWindow2.addHtmlElement(testButton1);
// logsWindow2.addHtmlElement(testButton2);


