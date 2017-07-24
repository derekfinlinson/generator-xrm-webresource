import { WebApi } from "xrm-webapi";

export namespace <%= namespace %> {
    export namespace Ribbon {
        let <%= variable %>: <%= filename %>;

        export function buttonClick(xrm?: Xrm.XrmStatic) {
            <%= variable %> = new <%= filename %>(xrm || Xrm);
            <%= variable %>.buttonClick();
        }
    }

    class <%= filename %> {
        constructor(xrm? Xrm.XrmStatic) {
            Xrm = xrm || Xrm;
        }
        
        buttonClick() {
            
        }
    }
}