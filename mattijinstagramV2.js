var ig = require('instagram-node').instagram(), //https://github.com/totemstech/instagram-node
    fs = require('fs'); 

function InstagramRip(parameters) {
    if (typeof parameters['instagramAccessToken'] !== 'undefined' ) {
	ig.use({ access_token: parameters['instagramAccessToken'] });
    } else {
	if ( typeof process.env.INSTAGRAM_ACCESS_TOKEN !== 'undefined' ){
    	    ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
	} else {
	    throw Error("Missing Api Token");
	}
    }
    this.userDetails = {};
    this.followersArray = [];
    if ( typeof parameters['username'] !== 'undefined' ) {
	this.username = parameters['username'];
	console.log(this.username);
    } else {
	throw Error("Missing username");
    }
};

InstagramRip.prototype.getUserDetailsFromUserId = function (user_id) {
    var that = this;
    ig.user(user_id,function(err, result,remaining, limit) {
	if (err){
	    throw err;
	}
	if (result){
	    that.userDetails = result;
	}
    });
};

InstagramRip.prototype.getUserIdFromUsername = function (/*username*/){
    var that = this;
    if (typeof this.username === 'string' ) {
	ig.user_search(this.username,function(err, users, remaining,  limit) {
	    if (err){
		throw err;
	    }
	    if (users){
		var usersLength=users.length,
		    i=0;
		//find the user id of the returned search result that matches our input username *exactly*
		for ( i = 0;  i < usersLength; i++ ) {
		    if (users[i].username==that.username){
			that.getUserDetailsFromUserId(users[i].id.toString());
			that.getUsersFollowersFromUserId(users[i].id.toString());
		    }
		}
	    }
	});
    }
}


InstagramRip.prototype.getUsersFollowersFromUserId = function (user_id){
    ig.user_followers(user_id, this.paginationFunction.bind(this));
}

//var paginationFunction = function(err, users, pagination, remaining, limit) {
InstagramRip.prototype.paginationFunction = function(err, users, pagination, remaining, limit) {
    if (err) {
	throw err;
    }
    if (users) {
	//console.log(users)
	/* for (var i = 0; i<users.length; i++) {
	//	console.log(users[i].username);
	//		this.followersArray.push.apply(this.followersArray,users);
	//holy shit whoops...yeah we don't want to copy on the array for each entry, just need to do that once!
	}*/
	this.followersArray.push.apply(this.followersArray,users);	
    };
    if(pagination && pagination.next) {
	//call yourself again to get the next set of followers
	pagination.next(this.paginationFunction.bind(this));
    } else {
	//	this.writeOutput();
	this.writeOutputToFile();
	/*	if ( cb && typeof cb === function ){
		
		}*/
    }
}

InstagramRip.prototype.writeOutput = function () {
    console.log(this.userDetails);
    console.log(this.followersArray);
}
InstagramRip.prototype.writeOutputToFile = function () {
    var userDetailsFilename = this.username+"_details.txt",
	userFollowersFilename = this.username+"_followersArray.txt",
	userAllInOneFilename = this.username+"_AllInOne.txt";
//if you wanted to output the 
    fs.writeFile(userDetailsFilename,JSON.stringify(this.userDetails,null,"\t"),'utf8',function(err){
	if (err) {
	    return console.log(err);
	}
	console.log("Writing "+userDetailsFilename);
    });
    fs.writeFile(userFollowersFilename,JSON.stringify(this.followersArray,null,"\t"),'utf8',function(err){
	if (err) {
	    return console.log(err);
	}
	console.log("Writing "+userFollowersFilename);
    });
    var dataOutput={userDetails:this.userDetails,followers:this.followersArray};
    
    fs.writeFile(userAllInOneFilename,JSON.stringify(dataOutput,null,"\t"),'utf8',function(err){
	if (err) {
	    return console.log(err);
	}
	console.log("Writing "+userAllInOneFilename);
    });
}

module.exports = InstagramRip
