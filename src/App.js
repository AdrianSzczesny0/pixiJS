import { Application } from "pixi.js";


export class App{
    constructor(){

        this.init();
    }
    async init(){
        const app = new Application();
        await app.init({
            width: window.innerWidth-50,
            height: window.innerHeight-50,
            backgroundColor: '#519a82ff'
        })
    
        document.body.appendChild(app.canvas);
    }
}