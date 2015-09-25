var ig = require('instagram-node').instagram(),
    request = require('request'),
    fs = require('fs');
console.log(process.env.INSTAGRAM_ACCESS_TOKEN);
ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
/*ig.use({ client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET });
*/

ig.user_self_feed( {count:500},function(err, medias, pagination, remaining, limit) {
    if (err){
	throw err
    }
    if (medias){
	//console.log(medias)
	medias.forEach(function(element,index,fullArray) {
	    if (element.images){// &&
	//	element.images.length > 0 &&
	//	element.images.standard_resolution) {
//		console.log(element.images)
//		console.log("-----",element.user.username)
		saveFile(element.user.username,extractHighestResURL(element.images));
		//element.images.forEach(function(ele,idx,fA){
		//console.log(ele)
		//})
//		console.log(element.images.standard_resolution.url); //appears max display resolution is 640x640
	    }
	    	if (element.videos) {
		    saveFile(element.user.username,extractHighestResolutionVideo(element.videos));
		}
	
	//    console.log(element.user.username)
	})

    }
//    console.log(pagination)
    console.log("remaining:",remaining);
    console.log("limit:",limit);
});

var userArray=['ericcanete','jakeparker','p_e_a_r_c_e'];

// userArray.forEach(function(user_id/*ele*/,ind,arr){
//     console.log(user_id);
//     ig.user_media_recent(user_id, function(err,medias,pagination, remaining,limit) {
// 	if (err){ throw err }
// 	if (medias){
// 	    medias.forEach(function(element,index,fullArray) {
// 		if (element.images){
// 		    saveFile(element.user.username,extractHighestResURL(element.images));
// 		}
// 	    })
// 	}
// 	console.log("remaining:",remaining);
// 	console.log("limit:",limit);    
//     });
// });

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



//function 

/*TumblrConnection.prototype.*/function saveFile(username,url){
    //console.log("url:",url);
    if (url !== null) {
    var splitURL = url.split('/'),
	imageFilename = splitURL[splitURL.length-1],
	filename=username+"_"+imageFilename;
	//console.log(splitURL);
    if ( fs.existsSync(filename) ) {
	//console.log(filename+" already exists. Skipping.")
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
		saveFile(usrename,url);//call ourself again if there was an error (mostlikely due to hitting the server too hard)
            }
	})
	imagerequest.pipe(imageStream)
    }
    }
}
