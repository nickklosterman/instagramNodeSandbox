var IR = require('./mattijinstagramV2'),
    fs=require('fs'),
    instagramListFilename;

if ( process.argv[2]) {
    instagramListFilename = process.argv[2];
}

if (typeof instagramListFilename !== 'undefined') {
    fs.stat(instagramListFilename,function(err,stats) {
	if (err){
	    throw err;
	} else  {
	    if (stats.isFile()){
		fs.readFile(instagramListFilename,'utf8', function (err, data) {
		    if (err) throw err;
		    var instagramUsernameArray = data.split('\n')
		    instagramUsernameArray.forEach(function(element,index,array){
			if (element.length > 0) {//filter out empty lines
			    var client = new IR({username:element});
			    client.getUserIdFromUsername();
			}
		    });//end forEach
		});//end fs.readFile
	    }
	}//end else
    })//end fs.stats.isFile
}//end
