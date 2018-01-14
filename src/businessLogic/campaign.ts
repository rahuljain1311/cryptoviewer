import * as _ from "lodash";
import { campaign } from "./validate";
const Model = require('../../models/index');

export function getSymptoms (campaignNoString: string) {

    const campaignNo = Number(campaignNoString);
    return Model.BTC.find({
        where: { id: campaignNo }
    }).then((campaignData: any) => {

        campaignData = JSON.parse(JSON.stringify(campaignData));
        return campaignData;
    });
};
