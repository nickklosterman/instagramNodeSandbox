var ig = require('instagram-node').instagram(); //https://github.com/totemstech/instagram-node

function getUserDetailsFromUserId(user_id) {
    ig.user(user_id,function(err, result,remaining, limit) {
	if (err){
	    throw err;
	}
	if (result){
	    console.log(result);
	}
/* //print the number of remaining API calls you have and the limit imposed on yourself
	console.log("remaining:",remaining);
	console.log("limit:",limit);
*/
    });
};

function getUserIdFromUsername(username){
    ig.user_search(username,function(err, users, remaining,  limit) {
	if (err){
	    throw err;
	}
	if (users){
	    console.log("username:"+username);
	    var usersLength=users.length,
		i=0;
	    //	    console.log("uL:"+usersLength);
	    //find the user id of the returned search result that matches our input username exactly
	    for ( i = 0;  i < usersLength; i++ ) {
		if (users[i].username==username){
		    //NOTE: you may want to comment out that second function as the # of users will make the user details disappear off the screen pretty quick.
		    getUserDetailsFromUserId(users[i].id.toString());
		    getUsersFollowersFromUserId(users[i].id.toString());
		}
	    }
	}
    }); 
}


function getUsersFollowersFromUserId(user_id){
    ig.user_followers(user_id, paginationFunction);
}

var paginationFunction = function(err, users, pagination, remaining, limit) {
    if (err) {
	throw err;
    }
    if (users) {
	    //console.log(users)
	    for (var i = 0; i<users.length; i++) {
		console.log(users[i].username);
	    }
    };
    if(pagination && pagination.next) {
	//call yourself again to get the next set of followers
	pagination.next(paginationFunction);
    }
}

/**/
//NOTE:you will need to change 'process.env.INSTAGRAM_ACCESS_TOKEN' to be your own token.  It might need to enclosed in quotes " or ticks '.
ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
//NOTE:if you enter in a user's name on the command line it will use it, otherwise it will use Elsa Hosk's handle. She is a Victoria's Secret model who I get to see everyday.
if (typeof process.argv[2] !== 'undefined'){
    getUserIdFromUsername(process.argv[2]);
} else {
    getUserIdFromUsername('hoskelsa'); //she has ~1.7M followers and about 1.7k posts
}

//My program doesn't deal with getting a 350/429 response from Instagram if I exceed the limits. I'm not sure but this might be caught in the if (err) {} statements. 

// http://stackoverflow.com/questions/20643830/using-the-instagram-api-to-get-all-followers this  post has some good links about rate limits changing quite a bit.
