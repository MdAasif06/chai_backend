import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
// import { load } from 'npm';
// import { loadEnvFile } from 'process';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloundinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
        { resource_type: "auto" })
        //file has been uploaded successfully
        console.log("files is uploaded on cloudinary",response.url)
        return response;

    } catch (error) {
       fs.unlinkSync(localFilePath)//remove the locally file as the operation failed
       return null;
    }
}


export {uploadOnCloundinary}