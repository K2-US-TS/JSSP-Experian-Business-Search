import '@k2oss/k2-broker-core';

metadata = {
    "systemName": "[Immersion] - Vendor Onboarding - Experian Business Search",
    "displayName": "Vendor Onboarding - Experian Business Search",
    "description": "Perform Experian search on a business and get a suggested credit level.",
    "configuration": {
        "ServiceURL": {
            displayName: "Experian Search URL",
            type: "string",
            value: "https://sandbox-us-api.experian.com/"
        }
    }
};

ondescribe = async function ({configuration}): Promise<void> {
    postSchema({
        objects: {
            "ExperianBusinessSearch": {
                displayName: "Experian Business Search",
                description: "Experian Business Search",
                properties: {
                    "client_id": {
                        displayName: "client_id",
                        type: "string"
                    },
                    "client_secret": {
                        displayName: "client_secret",
                        type: "string"
                    },
                    "username": {
                        displayName: "username",
                        type: "string"
                    },
                    "password": {
                        displayName: "password",
                        type: "string"
                    },
                    "issued_at": {
                        displayName: "issued_at",
                        type: "string"
                    },
                    "expires_in": {
                        displayName: "expires_in",
                        type: "string"
                    },
                    "token_type": {
                        displayName: "token_type",
                        type: "string"
                    },
                    "access_token": {
                        displayName: "access_token",
                        type: "string"
                    },
                    "refresh_token": {
                        displayName: "refresh_token",
                        type: "string"
                    },
                    "accessToken" : {
                        displayName: "accessToken",
                        type: "string"
                    },
                    "name" : {
                        displayName: "name",
                        type: "string"
                    },
                    "city" : {
                        displayName: "city",
                        type: "string"
                    },
                    "state" : {
                        displayName: "state",
                        type: "string"
                    },
                    "subcode" : {
                        displayName: "subcode",
                        type: "string"
                    },
                    "bin": {
                        displayName: "bin",
                        type: "string"
                    },
                    "businessName": {
                        displayName: "businessName",
                        type: "string"
                    },
                    "phone": {
                        displayName: "phone",
                        type: "string"
                    },
                    "street": {
                        displayName: "street",
                        type: "string"
                    },
                    "zip": {
                        displayName: "zip",
                        type: "string"
                    },
                    "zipExtension": {
                        displayName: "zipExtension",
                        type: "string"
                    },
                    "score": {
                        displayName: "score",
                        type: "string"
                    },
                    "percentileRanking": {
                        displayName: "percentileRanking",
                        type: "string"
                    },
                    "recommendedCreditLimitAmount": {
                        displayName: "recommendedCreditLimitAmount",
                        type: "string"
                    },
                    "riskCode": {
                        displayName: "riskCode",
                        type: "string"
                    },
                    "riskDefinition": {
                        displayName: "riskDefinition",
                        type: "string"
                    },
                    "highUtilizationAccounts": {
                        displayName: "highUtilizationAccounts",
                        type: "string"
                    },
                    "seriouslyDelinquentAccounts": {
                        displayName: "seriouslyDelinquentAccounts",
                        type: "string"
                    },
                    "activeCommercialAccounts": {
                        displayName: "activeCommercialAccounts",
                        type: "string"
                    },
                    "delinquentCommercialAccounts":{
                            displayName: "delinquentCommercialAccounts",
                            type: "string"
                    }
                },
                methods: {
                    "businessSearch": {
                        displayName: "Perform Business Search",
                        type: "execute",
                        inputs: ["username","password","client_id","client_secret","name","city","state","subcode"],
                        outputs: ["bin","businessName","phone","street","city","state","zip","zipExtension","score","percentileRanking","recommendedCreditLimitAmount","riskCode","riskDefinition","highUtilizationAccounts","seriouslyDelinquentAccounts","activeCommercialAccounts","delinquentCommercialAccounts"]
                    }
                }
            }
        }
    })
};

onexecute = async function ({objectName, methodName, parameters, properties, configuration}): Promise<void> {
    switch (objectName) {
        case "ExperianBusinessSearch": await onexecutePosts(methodName, parameters, properties, configuration); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecutePosts(methodName: string, parameters: SingleRecord, properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    switch (methodName) {
        case "businessSearch": await onexecutePostsbusinessSearch(parameters, properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

function onexecutePostsbusinessSearch(parameters: SingleRecord, properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) => {

        try {
            getToken(properties, configuration)
                .then (searchBusiness)
                .then (creditScore);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function getToken (properties: SingleRecord, configuration: SingleRecord) { 
    return new Promise ((resolve, reject) => {

        var urlValue = configuration["ServiceURL"] + 'oauth2/v1/token';
        var preBody = {
            username: properties['username'],
            password: properties['password'],
            client_id: properties['client_id'],
            client_secret: properties['client_secret']
        };
        var body = JSON.stringify(preBody);
        //console.log("BK_ExperianAuth_body: " + body);
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status code " + xhr.status + " " + xhr.responseText);

                //console.log("BK_" + xhr.responseText);
                resolve({
                    properties: properties,
                    configuration: configuration,
                    authToken: JSON.parse(xhr.responseText)
                })
            } catch (e) {
                reject(e);
            }
        }
        
        xhr.open("POST", urlValue);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
    }   
)};

function searchBusiness (obj){
    return new Promise ((resolve, reject) => {
        //console.log("BK_ExperianSearch_searchBusiness_Input : " + JSON.stringify(obj));
        var urlValue = obj.configuration.ServiceURL + 'businessinformation/businesses/v1/search';
        //console.log("BK_Experian_searchBusiness_urlValue = " + urlValue);
        var bearerToken = 'Bearer ' + obj.authToken.access_token;
        var preBody = {
            name: obj.properties.name,
            city: obj.properties.city,
            state: obj.properties.state,
            subcode: obj.properties.subcode
        };
        var body = JSON.stringify(preBody);
        //console.log("BK_ExperianAuth_body: " + body);
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status code " + xhr.status + " " + xhr.responseText);

                //console.log("BK_" + xhr.responseText);
                resolve({
                    results: JSON.parse(xhr.responseText),
                    obj
                });
            } catch (e) {
                reject(e);
            }
        }
        
        xhr.open("POST", urlValue);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', bearerToken);
        xhr.send(body);
    }
)};

function creditScore (obj){
    return new Promise ((resolve, reject) => {
        //console.log("BK_Experian_creditScore_Input: " + JSON.stringify(obj));
        var urlValue = obj.obj.configuration.ServiceURL + 'businessinformation/businesses/v1/scores';
        //console.log("BK_CreditScore_urlValue: "+urlValue);
        var bearerToken = 'Bearer ' + obj.obj.authToken.access_token;
        var preBody = {
            bin: obj.results.results[0].bin,
            subcode: obj.obj.properties.subcode,
            commercialScore: true
        };
        var body = JSON.stringify(preBody);
        //console.log("BK_ExperianAuth_body: " + body);
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status code " + xhr.status + " " + xhr.responseText);

                //console.log("BK_" + xhr.responseText);
                var completeResult = JSON.parse(xhr.responseText);
                postResult({
                    "bin":completeResult.results.businessHeader.bin,
                    "businessName":completeResult.results.businessHeader.businessName,
                    "phone": completeResult.results.businessHeader.phone,
                    "street": completeResult.results.businessHeader.address.street,
                    "city": completeResult.results.businessHeader.address.city,
                    "state": completeResult.results.businessHeader.address.state,
                    "zip": completeResult.results.businessHeader.address.zip,
                    "zipExtension": completeResult.results.businessHeader.address.zipExtension,
                    "score": completeResult.results.commercialScore.score,
                    "percentileRanking": completeResult.results.commercialScore.percentileRanking,
                    "recommendedCreditLimitAmount": completeResult.results.commercialScore.recommendedCreditLimitAmount,
                    "riskCode": completeResult.results.commercialScore.riskClass.code,
                    "riskDefinition": completeResult.results.commercialScore.riskClass.definition,
                    "highUtilizationAccounts": completeResult.results.commercialScoreFactors[0].code,
                    "seriouslyDelinquentAccounts": completeResult.results.commercialScoreFactors[1].code,
                    "activeCommercialAccounts": completeResult.results.commercialScoreFactors[2].code,
                    "delinquentCommercialAccounts": completeResult.results.commercialScoreFactors[3].code
                })
                resolve();
            } catch (e) {
                reject(e);
            }
        }
        
        xhr.open("POST", urlValue);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', bearerToken);
        xhr.send(body);
    }
)};