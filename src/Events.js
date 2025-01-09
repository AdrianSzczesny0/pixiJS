

export function createEvent(name, data){
    const event = new CustomEvent(name, { detail: data });
    document.body.dispatchEvent(event);
}

export const EVENTS ={
    WINDOW:{
        SELECTED:"WINDOW_SELECTED"
    }
}