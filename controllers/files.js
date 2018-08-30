/**
 * FileController module - implementaion of File-api 
 * 
 */
let fileController = {};


//POST - upload file
fileController.upload=(req,res,next)=>{
    if (!req.files){
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files[''];
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname+'/../images/'+req.params.imgtype+'/'+sampleFile.name, (err)=>{
    if (err){
      return next(err);
    }
    res.send('File uploaded!');
  });
}

//GET - download file by name
fileController.download=(req,res)=>{
    let file = __dirname+'/../images/'+req.params.imgtype+'/'+req.params.filename;
    res.download(file); 
}

module.exports = fileController;