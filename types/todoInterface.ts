import {scalarOptions} from "yaml";
import Bool = scalarOptions.Bool;

export interface TodoInterface {
    id: string,
    text: string,
    done: Boolean,
    date_created: number,
    date_expired: number,

}

export class todoInterface {
}