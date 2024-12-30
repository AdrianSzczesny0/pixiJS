import { Text, TextStyle } from "pixi.js";

export class TextObjectPooler{
    constructor(amount,app,parent){
        this.amount = amount;
        this.app = app;
        this.parent = parent;
        this.active = [];
        this.inactive = [];
        this.fadeCounter = 0;
        this.text = undefined;
        this.dequeTimer = 0;
        this.init()
    }
    init(){
        for (let i = 0; i < this.amount; i++) {
            this.text = new damageText(1000,100,this.parent,this.app);
            this.inactive.push(this.text);
        }
    }

    moveToActivePool(textValue,x,y){
        if(this.inactive.length> 0){
            let text = this.inactive[0];
            text.text = textValue;
            text.reset(x,y-100);
            this.active.push(this.inactive[0]);
            this.inactive.splice(0,1);
        }
    }

    moveToInactivePool(){
        if(this.active.length> 0){
            this.active.forEach(element => {
                if(!element.isActive){
                    this.inactive.push(this.active[0]);
                    this.active.splice(0,1);
                }
            });
        }
    }
    update(){
        this.dequeTimer+=0.1;
        if(this.dequeTimer > 5){
            this.moveToInactivePool()
            this.dequeTimer= 0;
        }
        
    }
}

export class damageText{
    constructor(x,y,parent,app){
        this.parent = parent;
        this.app = app;
        this.x = x;
        this.y = y;
        this.fadeCounter = 1;
        this.textSprite = undefined;
        this.isActive = false;
        this.init();
        this.style = {
            fontFamily: 'Arial',
            fontSize: 240,
            fill: 0xff1010,
            align: 'center'
        };
        this.text =0;
    }

    setVisible(){
        this.textSprite.visible = true;
    }

    draw(){
        this.textSprite = new Text({
            text:'50' , 
            style: { 
                fontSize : 80 , 
                fill: 'white',
                dropShadow: {
                    color: '#000000',
                    blur: 2,
                    angle: Math.PI / 3,
                    distance: 3,
                    alpha:0.05
                },
            }, 
            label:'text'
        });
        this.textSprite.position.x = this.x;
        this.textSprite.position.y = this.y;
        this.parent.addChild(this.textSprite);
        this.isActive = false;
        this.setVisible();
    }

    init(){
        this.draw();
    }

    update(){
        if(this.isActive){
            this.fade();
            this.move();
            this.textSprite.text = this.text;
        }
    }

    fade(){
        this.fadeCounter-=0.01;
        if(this.fadeCounter>=0){
            this.textSprite.alpha = this.fadeCounter;
        }
        if(this.fadeCounter<=0){
            this.isActive = false;
            this.textSprite.visible = false;
        }
    }

    reset(x,y){
        this.isActive = true;
        this.setVisible();
        this.fadeCounter = 1;
        this.textSprite.alpha = 1;
        this.textSprite.position.x = x;
        this.textSprite.position.y = y;
    }

    move(){
        this.textSprite.position.y--;
    }

}