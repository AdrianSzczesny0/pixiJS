import { Application, Assets } from "pixi.js";
import { Enity } from "./Entity";
import { Game } from "./Game";


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
        app.stage.sortableChildren = true;
        const texture1 = await Assets.load("./src/assets/tree01.png");
        const game  = new Game(app);
        const entity2 = new Enity(0,'Tree',{x:110, y:400} , texture1, app.stage, game);
        const entity3 = new Enity(1,'Tree',{x:140, y:500} , texture1, app.stage, game);
        const entity4 = new Enity(2,'Tree',{x:400, y:600} , texture1, app.stage, game);
        const entity = new Enity(3,'Tree',{x:80, y:300} , texture1, app.stage, game);

        document.body.appendChild(app.canvas);

        

        app.ticker.add((ticker) =>
        {
            // console.log(game.selectedEntity);
        });
    }
}