const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("file obtained", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      console.log("Error", err);
    });

    res.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log("Error uploading file", error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log('tempfile path',file.tempFilePath);
  if(quality){
    options.quality=quality;
  }
  options.resource_type = 'auto';
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload using cloudinary

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log("name", name);
    console.log("tags", tags);
    console.log("email", email);

    const file = req.files.imageFile;
    console.log("file", file);

    // validation

    const supportedTypes = ["jpg", "jpeg", "png", "gif"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "ritesh",30);
    console.log("response", response);

    // save in database

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "image uploaded successfully",
    });
  } catch (error) {
    console.log("Error uploading image", error);
    res.status(400).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

// video upload 

exports.videoUpload = async (req, res)=>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        
        const file =req.files.vedioFile;

        // vlaidation 

        const supportedTypes =['mp4','mov'];
        const fileType =file.name.split('.')[1].toLowerCase();
        console.log('file type:',fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supported",
              });
            }

            const response = await uploadFileToCloudinary(file, "ritesh");
            console.log("response", response);  
        
            const fileData = await File.create({
                name,
                tags,
                email,
                imageUrl: response.secure_url,
              });
       
    res.status(200).json({
        success: true,
        message: "video upload hogaya...",
      });



    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'kuch wrong hai...'
        })

    }
}
