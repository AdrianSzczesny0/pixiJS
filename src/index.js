import { Debug } from "./Debug";
import { App } from "./app";

const mousePosition = {
    x:0,
    y:0
}

document.body.addEventListener('mousemove', (e)=>{
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
})

const app  =  new App
const debug = new Debug(mousePosition);

