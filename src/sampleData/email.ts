'use strict';
import * as _ from "lodash";

const CoughFluEmailHeading1 = 'Flu Season Health Alert from Acme Insurance';

const CoughFluEmailHeading2 = 'Summary of Your Recent Flu Shots';

const DermatologyEmailHeading1 = 'Dermatology Health Alert from Acme Insurance';

type AllTypes = string | Array<string> | undefined;
export function get (text: string): string;
export function get (text: string): Array<string>;

export function get (text: string): AllTypes {

    if(text == 'CoughFluEmailHeading1'){
        return _.cloneDeep(CoughFluEmailHeading1);
    }
    else if(text == 'CoughFluEmailHeading2'){
        return _.cloneDeep(CoughFluEmailHeading2);
    }
    else if(text == 'DermatologyEmailHeading1'){
        return _.cloneDeep(DermatologyEmailHeading1);
    }
};
