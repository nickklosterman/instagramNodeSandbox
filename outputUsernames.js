var ig = require('instagram-node').instagram(),
    request = require('request'),
    fs = require('fs');
console.log(process.env.INSTAGRAM_ACCESS_TOKEN);
ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });

//this is only outputting the usernames of the instagram accounts with active content to download :/
ig.user_self_feed( {count:500},function(err, medias, pagination, remaining, limit) {
    if (err){
	throw err
    }
    if (medias){
	medias.forEach(function(element,index,fullArray) {
	    //push element.user.username onto array if it isn't already there. 
	    console.log(element.user.username);
	    //call callback which will print out the array when the forEach is complete. could possibly call the cb when index = fullArray.length
	});
    }
});


