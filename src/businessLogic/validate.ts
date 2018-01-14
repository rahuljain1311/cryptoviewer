import * as _ from "lodash";
import * as Moment from "moment";
const Model = require('../../models/index');

export function user (insuranceNoString: string) {

    const insuranceNo = Number(insuranceNoString);
    return Model.Profile.find({
        where: { insuranceNo: insuranceNo }
    }).then((userProfile: any) => {

        return new Promise((resolve, reject) => {

            if(userProfile)
                resolve();
            else
                reject();
        });
    });
};

export function campaign (campaignNoString: string) {

    const campaignNo = Number(campaignNoString);
    return Model.Campaign.find({
        where: { campaignNo: campaignNo }
    }).then((campaign: any) => {

        return new Promise((resolve, reject) => {

            if(campaign)
                resolve();
            else
                reject();
        });
    });
};

export function userInCampaign (campaignNoString: string, insuranceNoString: string) {

    const campaignNo = Number(campaignNoString);
    const insuranceNo = Number(insuranceNoString);
    return Model.Profile.find({
        where: { 
            insuranceNo: insuranceNo,
            CampaignCampaignNo: campaignNo
        }
    }).then((userProfile: any) => {

        return new Promise((resolve, reject) => {

            if(userProfile)
                resolve();
            else
                reject();
        });
    });
};

export function operational (exipirationTime: number) {

    return new Promise((resolve, reject) => {

        const timeDiff = Moment(exipirationTime).diff(Moment.now());
        // It has expired
        if(timeDiff < 0)
            reject();
        else
            // Still valid
            resolve();
    });
};

export function pharmacy (insuranceNoString: string) {

    const insuranceNo = Number(insuranceNoString);
    return Model.Profile.find({
        where: { insuranceNo: insuranceNo },
        attributes: ['insuranceNo'],
        include: [{
            model: Model.Pharmacy
        }]
    }).then((pharmacy: any) => {

        pharmacy = JSON.parse(JSON.stringify(pharmacy));
        return new Promise((resolve, reject) => {

            if(pharmacy.Pharmacies.length > 0)
                resolve();
            else
                reject();
        });
    });
};

export function doctor (insuranceNoString: string) {

    const insuranceNo = Number(insuranceNoString);
    return Model.Profile.find({
        where: { insuranceNo: insuranceNo },
        attributes: ['insuranceNo'],
        include: [{
            model: Model.Doctor
        }]
    }).then((doctor: any) => {

        doctor = JSON.parse(JSON.stringify(doctor));
        return new Promise((resolve, reject) => {

            if(doctor.Doctors.length > 0)
                resolve();
            else
                reject();
        });
    });
};

export function campaignHasSummary (campaignNoString: string) {

    const campaignNo = Number(campaignNoString);
    return Model.Campaign.find({
        where: { campaignNo: campaignNo },
        attributes: ['hasSummary']
    }).then((campaign: any) => {

        campaign = JSON.parse(JSON.stringify(campaign));
        return new Promise((resolve, reject) => {

            if(campaign.hasSummary)
                resolve();
            else
                reject();
        });
    });
};
