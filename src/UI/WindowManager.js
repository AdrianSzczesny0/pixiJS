import { EVENTS } from "../Events";
import { Modal } from "./Modal";


export class WindowManager{
    constructor(){
        this.list = [];
        this.currentlySelected;
        this.mousePosition = {
            x:0,
            y:0
        }
        this.maxZindex = 0;
        this.init();
    }

    init(){
        this.addMousePositionListener();
        this.windowEventListener();
    }

    addMousePositionListener(){
        document.body.addEventListener('mousemove', (e)=>{
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        })
    }
    windowEventListener(){
        document.body.addEventListener(EVENTS.WINDOW.SELECTED,(e)=>{
            this.selectWindow(e.detail);
        })
    }
    selectWindow(windowID){
        this.currentlySelected = this.list[windowID];
        this.currentlySelected.modal.element.style.zIndex = this.maxZindex+1;
        this.maxZindex++;
        console.log(this.currentlySelected.modal.element.zIndex);
    }

    addWindow(windowName,x,y,w,h,parent){
        const win = new Modal(this.list.length, x, y, w, h, windowName, this.mousePosition, parent);
        win.zIndex = this.list.length;
        this.list.push(win);
        this.currentlySelected = win;
        win.zIndex = this.list.length;
        this.maxZindex+=1;
    }
    getWindowElementByID(id){
        return this.list[id];
    }

}