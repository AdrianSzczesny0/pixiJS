import { TowerType } from "./Types";


export const createEvent = (eventName, eventData)=>{
    const event = new CustomEvent( eventName, { detail: {data: eventData}} );
    dispatchEvent(event);
}