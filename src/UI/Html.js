

export class HTML{
    constructor(tag,_class,id,parent,htmlString){
        this.tag = tag;
        this.class = _class;
        this.value;
        this.id = id;
        this.htmlString = htmlString;
        this.parent = parent;
        this.child;
        this.element;
        this.init();
    }

    init(){
        if(this.htmlString==undefined){
            this.htmlString = this.createHTMLstring();
            this.createHtmlElement()
        }else{
            this.htmlString = this.htmlString;
            this.createHtmlElement()
        }
    }

    createHTMLstring(){
        return `
        <${this.tag} class="${this.class}" id="${this.id}"></${this.tag}>`
    }

    createHtmlElement(){
        const template = document.createElement('template');
        template.innerHTML = this.htmlString.trim();
        const view = template.content.firstElementChild;
        this.parent.appendChild(view);
        this.element = view;
    }

    setValue(value){
        this.element.innerText = value;
    }

    addChild(childElement){
        this.element.appendChild(childElement);
    }
}




    
