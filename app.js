var ig = require('instagram-node').instagram();
 
ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
/*ig.use({ client_id: process.env.INSTAGRAM_CLIENT_ID,
         client_secret: process.env.INSTAGRAM_CLIENT_SECRET });
*/

ig.user_self_feed( function(err, medias, pagination, remaining, limit) {
if (err){
throw err
}
if (medias){
//console.log(medias)
medias.forEach(function(element,index,fullArray) {
if (element.images && element.images.standard_resolution) {
console.log(element.images)
//element.images.forEach(function(ele,idx,fA){
//console.log(ele)
//})
console.log(element.images.standard_resolution.url); //appears max display resolution is 640x640
}
console.log(element.user.username)
})

}
console.log(pagination)
console.log(remaining)
console.log(limit)
});


