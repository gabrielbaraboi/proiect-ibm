import cos from '../config/ibmCloudConfig.js';

const bucketName = "ibmprojectbucket";

export const uploadFile = async (itemName, file) => {
    console.log(`Creating new item: ${itemName}`);
    return await cos.putObject({
        Bucket: bucketName,
        Key: itemName,
        Body: file
    }).promise();
};

export const getFileStream = (itemName) => {

    return cos.getObject({
        Bucket: bucketName,
        Key: itemName
    }).createReadStream();
}