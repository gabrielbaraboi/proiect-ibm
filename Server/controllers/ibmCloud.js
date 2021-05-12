import cos from '../config/ibmCloudConfig.js';

const bucketName = "ibmprojectbucket";

export const uploadFile = (itemName, file) => {
    return cos.putObject({
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
};
export const deleteFile = (itemName) => {
    return cos.deleteObject({
        Bucket: bucketName,
        Key: itemName
    }).promise();
}