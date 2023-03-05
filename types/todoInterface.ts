import {scalarOptions} from "yaml";
import Bool = scalarOptions.Bool;

export interface TodoInterface {
    id?: string,
    header: string,
    text: string,
    done: Boolean,
    created_at: string,
    date_expired: string,

}

export class todoInterface {
}