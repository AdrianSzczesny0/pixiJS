import { createFrameListHtml } from "./Frame";
import { HTML } from "./Html";
import { Modal } from "./Modal";


export class FramesModal{
    constructor(id){
        this.id = id;
        this.mousePosition = {
            x:0,
            y:0
        }
        this.modal;
        this.frameList = [1,2,3,4,5,6,7,8];
        this.init();

    }
    init(){
        this.modal = new Modal(this.id, 900,100,400,800,'Frames',this.mousePosition,document.body);
        let framesHtmlString = createFrameListHtml(this.frameList);
        let framesHtmlElement = new HTML('','','',document.body,framesHtmlString);
        this.modal.addHtmlElement(framesHtmlElement);
    }
    
}