import cos from '../config/ibmCloudConfig.js';

const bucketName = "ibmprojectbucket";

export const uploadFile = async (itemName, file) => {
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
};
export const deleteFile = async (itemName) => {
    return cos.deleteObject({
        Bucket: bucketName,
        Key: itemName
    }).promise();
}