var fileController = {};

fileController.upload=function(req,res){
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files[''];
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname+'/../images/'+req.params.imgtype+'/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
}

fileController.download=function(req,res){
    var file = __dirname+'/../images/'+req.params.imgtype+'/'+req.params.filename;
    res.download(file); 
}

module.exports = fileController;