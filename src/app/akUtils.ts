import * as AWS from 'aws-sdk';

export class akUtils {

    // window reference
    getNativeWindow() {
        return window;
    }

    getDefaultItem() {
        let newItem = { "customerAddress": { "S": "" }, "customerAddressProof": { "S": "" }, "customerAdvance": { "N": "0" }, "customerCommentHistory": { "S": "" }, "customerDOB": { "S": "" }, "customerDOJ": { "S": "" }, "customerFatherName": { "S": "" }, "customerFatherOccupation": { "S": "" }, "customerFatherPhNumber": { "S": "" }, "customerFatherWhatsAppNo": { "S": "" }, "customerID": { "N": "0" }, "customerImageUrl": { "S": "" }, "customerIsPresent": { "BOOL": true }, "customerLastLogin": { "S": "" }, "customerMoneyHistory": { "L": [] }, "customerMonthly": { "N": "0" }, "customerName": { "S": "" }, "customerPassword": { "S": "" }, "customerPaymentType": { "S": "" }, "customerPhNumber": { "S": "" }, "customerRoomName": { "S": "" }, "customerRoomType": { "S": "" }, "customerSalary": { "S": "" }, "customerUserName": { "S": "" }, "customerWhatsAppNo": { "S": "" } };

        return newItem;

    }
    setAWSOBject() {
        AWS.config.accessKeyId = 'AKIAIT6MPCPLALDLP6HA';
        AWS.config.secretAccessKey = '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';
        AWS.config.region = 'us-east-1';
    }

}
