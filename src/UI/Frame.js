import { HTML } from "./Html";


export class Frame{
    constructor(id,parent,htmlString){
        this.parent = parent;
        this.htmlString = htmlString;
        this.id = id;
        this.element;
        this.init();
    }
    init(){
        this.htmlString = getFramesHtml;
        this.element = new HTML('div','frameWrapper',`frame-${this.id}`,this.parent,this.htmlString);
    }

}

export function createFrameHtml(list){
    let id = 0;
    let returnHtml = `<div class='moveTo' id="${id}"></div>`;
    id++;
    
    list.forEach(item => {
        returnHtml +=`<div class="frameWrapper" draggable="true">
            <div class="info"></div>
            <div class="actions">
                <div class="cloneBtn"></div>
                <div class="removeBtn"></div>
            </div>
        </div>
        <div class='moveTo' id="${id}"></div>`
        id++;
    });
    return returnHtml;
}

export function createFrameListHtml(list){
    return `<div class="listWrapper">
        <div class="currentFrames">
            ${createFrameHtml(list)}
        </div>
        <div class="addFrames">
            <div class="addFrameBtn">
                <div class="plusIcon"></div>
                <span class="addFrame"> Add frame </span>
            </div>
        </div>
    </div>`
}