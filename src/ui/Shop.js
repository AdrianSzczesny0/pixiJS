import { Graphics } from "pixi.js";


export class Shop{
    constructor(parent){
        this.parent = parent;
        this.closeButton;
        this.modalWindow;
        this.buyButton;
        this.init();
    }
    init(){
        this.createModalWindow();
        this.createShopOptions();
        this.addEventListeners();
    }
    addEventListeners(){

    }
    createModalWindow(){
        this.modalWindow = new Graphics({label:'modal'})
        .rect(window.innerWidth/4, window.innerHeight/10, window.innerWidth/2, window.innerHeight/2)
        .fill('#eef2f5ff')
        .rect(window.innerWidth/4, window.innerHeight/10, window.innerWidth/2, window.innerHeight/30)
        .fill('#90aabeff');
        this.parent.addChild(this.modalWindow);
    }
    createShopOptions(){
        const graph = new Graphics()
        .rect(this.modalWindow.x, window.innerHeight/8, window.innerWidth/10, window.innerHeight/5)
        .fill('red')
        this.parent.addChild(graph);
    }

}