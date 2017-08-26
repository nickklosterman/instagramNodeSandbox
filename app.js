var ig = require('instagram-node').instagram(),
    request = require('request'),
    fs = require('fs');
var ACCESS_TOKEN='1274000443.e029fea.5c96d0feebe9403b9e171030c6caf420';

console.log('----------I think this library no longer works-----------');
process.exit(1) ;

console.log(process.env.INSTAGRAM_ACCESS_TOKEN);
//ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
ig.use({ access_token: ACCESS_TOKEN });
//ig.use({ client_id: 'ee820f4f45844f4d9f1d8b1f21683b25',
 //        client_secret: 'fbaa81f2d37e4d7fb3e66abf181d4fd5' });
ig.user_self_feed( {count:500},function(err, medias, pagination, remaining, limit) {
    if (err){
	console.log(err);
//	throw err
    }
    if (medias){
	console.log(medias);
	medias.forEach(function(element,index,fullArray) {
	    if (element.images){
		saveFile(element.user.username,extractHighestResURL(element.images));
	    }
	    if (element.videos) {
		saveFile(element.user.username,extractHighestResolutionVideo(element.videos));
	    }
	})

    }
    console.log("remaining:",remaining);
    console.log("limit:",limit);
});


function extractHighestResURL(images){
    if (images.standard_resolution) {
	return images.standard_resolution.url;
    } else if (images.low_resolution) {
	return images.low_resolution.url;
    } else if (images.thumbnail) {
	return images.thumbnail.url;
    } else {
	return null;
    }
};

function extractHighestResolutionVideo(videos){
    if (videos.standard_resolution) {
	return videos.standard_resolution.url;
    } else if (videos.low_resolution) {
	return videos.low_resolution.url;
    } else {
	return null;
    }
    
};


/*TumblrConnection.prototype.*/function saveFile(username,url){
    //console.log("url:",url);
    if (url !== null) {
	var splitURL = url.split('/'),
	    imageFilename = splitURL[splitURL.length-1],
	    filename,
	    questionMarkIndex = imageFilename.indexOf('?');
	
	//they changed the filename so they look like this now dannybeckart_1172091_799294770175756_1563873002_n.jpg?ig_cache_key=MTE5NzMyMDA5MjcwNDA2NTE5NA%3D%3D.2
	if ( questionMarkIndex != -1 ) {
	    imageFilename = imageFilename.substr(0,imageFilename.indexOf('?'));
	}
	filename=username+"_"+imageFilename;
	//console.log(splitURL);
	if ( fs.existsSync(filename) ) {
	    console.log(filename+" already exists. Skipping.")
	    //process.stdout.write("X")
	} else {
	    var imageStream=fs.createWriteStream(filename)
	    imageStream.on('close',function(){
		//	imageStream.on('end',function(){
		console.log("Writing of "+filename+" done.")
	    })
	    var options = {url:url,headers:{ 'User-Agent':'request'}}
	    var imagerequest=request(options,function(err,resp,body) {
		if (err){
		    if (err.code === 'ECONNREFUSED') {
			console.error(url+' Refused connection');
		    } else if (err.code==='ECONNRESET') {
			console.error(url+' reset connection')
		    } else if (err.code==='ENOTFOUND') {
			console.error(url+' enotfound')
		    } else {
			console.log(url+err);
			console.log(err.stack);
		    }
		    saveFile(username,url);//call ourself again if there was an error (mostlikely due to hitting the server too hard)
		    //use settimeout and call yourself?
		}
            })
	    imageStream.on('error',function(error) {
		if (error) {
		    console.log("imageStream error:"+error)
		    saveFile(username,url);//call ourself again if there was an error (mostlikely due to hitting the server too hard)
		}
	    })
	    imagerequest.pipe(imageStream)
	}
    }
}
