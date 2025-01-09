import { EVENTS, createEvent } from "../Events";
import { HTML } from "./Html";


export class Modal{
    constructor(id,x,y,w,h,windowName,mousePosition,parent){
        this.parent = parent;
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.windowName = windowName;
        this.mousePosition = mousePosition;
        this.headerElement;
        this.contentElement;
        this.minBtn;
        this.modal;
        this.grabbed = false;
        this.grabbedOffest = {
            x:0,
            y:0
        }
        this.zIndex = 0;
        this.init();
    }
    init(){
        this.createWindow();
        this.addWindowEventListeners();
    }

    createWindow(){
        let parent = this.parent == undefined  ? document.body : this.parent.modal.element;
        console.log(this.parent);
        let title = this.parent == undefined ? this.windowName : `${this.parent.windowName} --> ${this.windowName}`;
        this.modal = new HTML('div', 'window', `window-${this.windowName}`,parent);
        this.modal.element.zIndex = this.id;
        this.modal.element.style.width = `${this.w}px`;
        this.modal.element.style.height = `${this.h}px`;
        this.headerElement = new HTML('div','header',`header-${this.id}`, this.modal.element);
        const headerTitle = new HTML('span','title',`title-${this.id}`, this.headerElement.element);
        headerTitle.setValue(title);
        this.minBtn = new HTML('div','minBtn',`minBtn-${this.id}`, this.headerElement.element);
        this.minBtn.setValue('--');
        this.contentElement = new HTML('div','contentWrapper',`content-${this.id}`, this.modal.element);
        this.contentElement.element.style.height = `${this.h-20}px`;
        this.contentElement.element.style.opacity = this.parent == undefined ? 0.5 : 0.3;
        this.setWindowPositon();
    }

    addWindowEventListeners(){
        this.minBtn.element.addEventListener('click', (e)=>{
            this.toggleMinMax();
        })
        this.headerElement.element.addEventListener('mouseover', (e)=>{
            this.headerElement.element.classList.add('grab');
        })
        this.headerElement.element.addEventListener('mouseout', (e)=>{
            this.headerElement.element.classList.remove('grab');
        })
        this.headerElement.element.addEventListener('mousedown', (e)=>{
            this.headerElement.element.classList.remove('grab');
            this.headerElement.element.classList.toggle('grabbed');
            this.grabbed = true;
            this.getOffset();
            createEvent(EVENTS.WINDOW.SELECTED, this.id);
        })
        this.contentElement.element.addEventListener('mousedown',(e)=>{
            createEvent(EVENTS.WINDOW.SELECTED, this.id);
        })
        this.headerElement.element.addEventListener('mouseup', (e)=>{
            this.headerElement.element.classList.add('grab');
            this.headerElement.element.classList.remove('grabbed');
            this.grabbed = false;
        })
        document.body.addEventListener('mousemove',(e) =>{
            if(this.grabbed){
                this.updateWindowPosition();
            }
        })
    }
    toggleMinMax(){
        this.contentElement.element.classList.toggle('hidden');
    }
    
    updateWindowPosition(){
        this.modal.element.style.left = `${this.mousePosition.x-this.grabbedOffest.x}px`;
        this.modal.element.style.top = `${this.mousePosition.y-this.grabbedOffest.y}px`;
    }

    setWindowPositon(){
        this.modal.element.style.left = `${this.x}px`;
        this.modal.element.style.top = `${this.y}px`;
    }

    getOffset(){
        let left = window.getComputedStyle(this.modal.element,null).getPropertyValue('left');
        left = Number(left.substring(0, left.length-2));
        let top = window.getComputedStyle(this.modal.element,null).getPropertyValue('top');
        top = Number(top.substring(0, top.length-2));
        this.grabbedOffest.x = this.mousePosition.x - left;
        this.grabbedOffest.y = this.mousePosition.y - top;
    }
}