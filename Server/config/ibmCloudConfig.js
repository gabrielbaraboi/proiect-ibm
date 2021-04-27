import IBM from 'ibm-cos-sdk';

const config ={
    endpoint: "s3.eu-de.cloud-object-storage.appdomain.cloud",
    apiKeyId: "-VEl6Hct2P36yUGNliZSlxJwy5UCFlEBYgZTb8D4RtHf",
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/b3f3e2c1771642c39d55111592b15503:092a3966-24f0-4318-bfa6-532a8ea3610e::",
    signatureVersion: 'iam',
}

export default new IBM.S3(config);