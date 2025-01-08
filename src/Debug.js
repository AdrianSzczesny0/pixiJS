

export class Debug {
    constructor(mousePosition){
        this.mousePosition = mousePosition;
        this.debugWindow = document.querySelector(".debugWindow");
        this.minMaxBtn = document.querySelector(".minBtn");
        this.header = document.querySelector(".header");
        this.debugContent = document.querySelector(".debugContentWrapper");
        this.grabbed = false;
        this.grabbedOffest = {
            x:0,
            y:0
        }
        this.init();
    }

    init(){
        this.minMaxBtn.addEventListener('click', (e)=>{
            this.toggleMinMax();
        })
        this.header.addEventListener('mouseover', (e)=>{
            this.header.classList.add('grab');
        })
        this.header.addEventListener('mouseout', (e)=>{
            this.header.classList.remove('grab');
        })
        this.header.addEventListener('mousedown', (e)=>{
            this.header.classList.remove('grab');
            this.header.classList.toggle('grabbed');
            this.grabbed = true;
            this.getOffset();
        })
        this.header.addEventListener('mouseup', (e)=>{
            this.header.classList.add('grab');
            this.header.classList.remove('grabbed');
            this.grabbed = false;
        })
        document.body.addEventListener('mousemove',(e) =>{
            if(this.grabbed){
                this.updateWindowPosition();
            }
        })
    }
    toggleMinMax(){
        this.debugContent.classList.toggle('hidden');
    }
    updateWindowPosition(){
        this.debugWindow.style.left = `${this.mousePosition.x-this.grabbedOffest.x}px`;
        this.debugWindow.style.top = `${this.mousePosition.y-this.grabbedOffest.y}px`;
    }
    getOffset(){
        let left = window.getComputedStyle(this.debugWindow,null).getPropertyValue('left');
        left = Number(left.substring(0, left.length-2));
        let top = window.getComputedStyle(this.debugWindow,null).getPropertyValue('top');
        top = Number(top.substring(0, top.length-2));
        this.grabbedOffest.x = this.mousePosition.x - left;
        this.grabbedOffest.y = this.mousePosition.y - top;
    }

}