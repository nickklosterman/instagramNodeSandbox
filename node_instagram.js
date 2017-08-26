//
// I had to generate a diff token to get out of Sandbox mode which only lets you pretty much see yours . I generated th etoken her: http://services.chrisriversdesign.com/instagram-token/ based on this SO post: https://stackoverflow.com/questions/33886881/instagram-api-doesn-t-find-any-liked-posts-for-sandbox-users

//https://www.instagram.com/developer/endpoints/media/

//It appears that the whole app process had changed a bit such that i needed to reauthorize access
//I had to follow these directions: https://www.instagram.com/developer/authentication/ to get access and get a code.

const Instagram = require('node-instagram').default; //https://www.npmjs.com/package/node-instagram or https://github.com/pradel/node-instagram
 var
client_id='ee820f4f45844f4d9f1d8b1f21683b25',
client_secret='fbaa81f2d37e4d7fb3e66abf181d4fd5',

ACCESS_TOKEN='1274000443.e029fea.5c96d0feebe9403b9e171030c6caf420';//'1274000443.ee820f4.8e1c70f88f74446ab8f353909972a836';


// Create a new instance. 
const instagram = new Instagram({
  clientId: client_id,
  accessToken: ACCESS_TOKEN,
});
 
// You can use callbacks or promises 
/*instagram.get('users/self/followed-by', (err, data) => {
  console.log(data);
});*/

/*
var query='paris';
query= 'saraunderwood';
instagram.get('users/search', { q: query }).then((data) => {
  console.log(data);
  });*/

/*
To find the user id, open the debug panel and go to the network tab and filter for only html files. in the html file for the user e.g. /ottoschmidt/?hl=en do a search for "id" : the number following is the number of the user.
I think there is an eaier way I found it for emrata and saraunderwood 

or click on an image and look at the html page that brings up. look for the meta that has instapp:owner_user_id and that is the id :)
-->> use the getInstagramIdFromPost.sh script
*/

var saraunderwoodID=43891656,
    emrataID=1999824,
    ottoschmidtID=326247731,
    jaeleeeartID=1771985787,
    evagreenID=1159806677,
    annakendrickID=245392676,
    muradosmanID=6281714,
    alessandrobarbucciID=220986065,//1556477315847178347,
    jakeparkerID=6334598,
    ohnonatalieID=237622423,
    shomooID=40772166,
    braoID=971852276,
    gregtocchiniID=29384859,
    totinotedescoID=3535043462,
    subversivegirlID=52128487,
    moonmxtrID=9780975,
    benbassoID=177454989,
    patriciobetteoID=8795160,
    michaelfirmanID=3187575257,
    themicellisID=12719734,
    juandoeID=18079466,
    enriquesifuenteID=2060167764,
    scottrobertsonID=191041888,
    frankchoartID=2972665682,
    ericcaneteID=2894708,
    kenrocafortID=2030323247,
    mirkand89=482841230,
    bradleyfriesen=41860115,
    mrbentleytheodg=1298763699,
    alyciafoy=176396919,//brad friesen gf
    stevebitanga=13426324,
    jefflombardo=1386294,
    everchanginghorizon=4035520,
    jckphotog=402607372,
    kylormelton=1418254127, //travel photog
    mikaikarl=337107925, //travel photog sebboom is another similar one
    noelleoninsta=230461805,
    max_id=1,
    ID;

//I need to change this so that it reads a json file and then outputs the urls in the appropriate file.

//ids to get sinkevitch,  daniela uhlig
//celia calle,  sg murphy

// I typically go to /tmp and execute the script and pipe the urls to a file and then get the images by running wget -i file.txt

//max_id ='1539341240617511409_43891656';
//max_id = '1522681393028382139_43891656';

ID=jefflombardo;//stevebitanga;//saraunderwoodID;//bradleyfriesen;//michaelfirmanID;//mirkand89;//jakeparkerID;//benbassoID;//muradosmanID;//alessandrobarbucciID;//braoID;////annakendrickID;//ottoschmidtID;//emrataID;//saraunderwoodID;

 //set the max id to the last id of the last image returned then go and get more images
instagram.get('users/'+ID+'/media/recent',{}, (err, data) => {
//    console.log(data);
  
    for (var i =0; i<data.data.length; i++){
	if (data.data[i].images){
	    var re = /\/s640x640/;  //It appears that all you need to do is remove the s640x640 to get the high res image url.
	    console.log(data.data[i].images.standard_resolution.url.replace(re, ''));
	}
	if (data.data[i].videos){
	    console.log(data.data[i].videos.standard_resolution.url);
	}
	if (i == data.data.length -1) {
	    max_id = data.data[i].id;
	}
    }
});

getUsersMedia();

function getUsersMedia() {
instagram.get('users/'+ID+'/media/recent',{count: 32 , max_id: max_id /*, min_id: */}, (err, data) => {
//    console.log(data);
  
    for (var i =0; i<data.data.length; i++){
	if (data.data[i].images){
	    var re = /\/s640x640/;  //It appears that all you need to do is remove the s640x640 to get the high res image url.
	    console.log(data.data[i].images.standard_resolution.url.replace(re, ''));
	}
	if (data.data[i].videos){
	    console.log(data.data[i].videos.standard_resolution.url);
	}
	if (i == data.data.length -1) {
	    if ( max_id != data.data[i].id ) {
	    // console.log(data.data[i].id);
		max_id = data.data[i].id;
		getUsersMedia();
	    } 
	}
    }
});
}
