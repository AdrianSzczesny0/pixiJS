import { Application, Assets } from "pixi.js";
import { Enity } from "./Entity";


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
        app.stage.hitArea = app.screen;
        app.stage.eventMode = 'static';
        const texture1 = await Assets.load("./src/assets/tree01.png");
        const entity = new Enity('Tree',{x:100, y:300} , texture1, app.stage);

        document.body.appendChild(app.canvas);
    }
}