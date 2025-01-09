
import { Modal } from "./UI/Modal";
import { WindowManager } from "./UI/WindowManager";
import { App } from "./app";


const app  =  new App();
const windowManager = new WindowManager();
windowManager.addWindow('Debug',100,100,300,500);
windowManager.addWindow('Test',300,300,300,250);
windowManager.addWindow('Navigation',600,300,600,700);

