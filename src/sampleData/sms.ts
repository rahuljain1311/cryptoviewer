'use strict';
import * as _ from "lodash";

const CoughFluSMS1 = 
`Message from Acme insurance: \n
$0 \n
$1 \n
$2 \n
Get a flu shot today:
$3 \n
Already have the flu?
Find a doctor:
$4 \n
Check your symptoms:
$5`;

const CoughFluSMS2 = 
`Message from Acme insurance: \n
$0 \n
Find out how much you saved and learn more about what to expect next: \n
View flu prevention summary:
$1 \n
Already have the flu?
Find a doctor:
$2 \n
Check your symptoms:
$3`;

const DermatologySMS1 = 
`Message from Acme insurance: \n
$0 \n
Get a flu shot today:
$1 \n
Already have the flu?
Find a doctor:
$2 \n
Check your symptoms:
$3`;

type AllTypes = string | Array<string> | undefined;
export function get (text: string): string;
export function get (text: string): Array<string>;

export function get(text: string): AllTypes {

    if(text == 'CoughFluSMS1'){
        return _.cloneDeep(CoughFluSMS1);
    }
    else if(text == 'CoughFluSMS2'){
        return _.cloneDeep(CoughFluSMS2);
    }
    else if(text == 'DermatologySMS1'){
        return _.cloneDeep(DermatologySMS1);
    }
};
