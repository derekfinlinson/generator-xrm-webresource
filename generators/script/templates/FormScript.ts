import { WebApi } from "xrm-webapi";

export namespace <%= namespace %> {
    let <%= variable %>: <%= filename %>;

    export function onLoad(xrm?: Xrm.XrmStatic): void {
        <%= variable %> = new <%= filename %>(xrm || Xrm);
        <%= variable %>.onLoad();
    }

    class <%= filename %> {
        constructor(xrm?: Xrm.XrmStatic) {
            Xrm = xrm || Xrm;
        }

        onLoad() {
            // Define on load events

            // Add on change events
            
            // Add on save events
        }
    }
}