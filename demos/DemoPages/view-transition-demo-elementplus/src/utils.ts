export const $ = function(selector:string){
    return document.querySelector(selector)
}
// listen
export const $li = (
    target: EventTarget | null,
    eventName: string,
    handler: EventListener
) => {
    target?.addEventListener(eventName, handler);
};