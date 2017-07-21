import { WebApi } from "xrm-webapi";

export namespace <%= namespace %> {
    export namespace Ribbon {
        let <%= variable %>: <%= filename %>;

        export function buttonClick(xrm?: Xrm.XrmStatic) {
            <%= variable %> = new <%= filename %>(xrm || Xrm);
            <%= variable %>.buttonClick();
        }
    }

    export class <%= filename %> {
        buttonClick() {
            
        }
    }
}