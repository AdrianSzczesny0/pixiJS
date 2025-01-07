import { ACTIONS } from "./Actions";



export class Game{
    constructor(app){
        this.app = app;
        this.selectedEntity;
        this.mousePosition = {
            x:0,
            y:0
        }
        this.action = ACTIONS.SCALE;
        this.init();
    }
    init(){
        this.globalEvents();

    }
    globalEvents(){
        window.addEventListener('pointerup', (e)=>{
            try {
                this.selectedEntity.setAlpha(1);
                this.selectedEntity.updateZIndex();
                this.selectedEntity = null;
            } catch (error) {
                
            }

        });
        window.addEventListener('mousemove', (e)=>{
            if(this.selectedEntity!= undefined || this.selectedEntity!= null){
                this.selectedEntity.updateSpritePosition(this.mousePosition.x, this.mousePosition.y);
                this.selectedEntity.updateZIndex();
                this.selectedEntity.setAlpha(0.5);
            }
        })
        this.app.stage.on('mousemove', (e) =>{
            this.mousePosition.x = e.x;
            this.mousePosition.y = e.y;
        })

    }
}