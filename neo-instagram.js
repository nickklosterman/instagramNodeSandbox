const NeoInstagram = require('neo-instagram')
 
const client = new NeoInstagram({
    client_id: 'ee820f4f45844f4d9f1d8b1f21683b25',
    client_secret: 'fbaa81f2d37e4d7fb3e66abf181d4fd5' })

ACCESS_TOKEN='1274000443.e029fea.5c96d0feebe9403b9e171030c6caf420';//'1274000443.ee820f4.8e1c70f88f74446ab8f353909972a836';
console.log("I'm guessing this client worked just fine as well it was just the sandbox restrictions that were borking things. ")


// Callback 
//client.get('users/self', { access_token: ACCESS_TOKEN }, (err, user) => { console.log(err, user) }) //works
//client.get('users/self/followed-by', { access_token: ACCESS_TOKEN }, (err, user) => { console.log(err, user) }) //returns nothing useful

client.get('users/search', { q: 'saraunderwood', access_token: ACCESS_TOKEN, count: 10 }, (err, user) => { console.log(err, user) })

//client.get('users/self/follows', { access_token: ACCESS_TOKEN }, (err, users) => { console.log("\n"); console.log(err, users) })

//https://api.instagram.com/v1/users/search?q=saraunderwood&access_token=1274000443.ee820f4.8e1c70f88f74446ab8f353909972a836
client.get('users/43891656', { access_token: ACCESS_TOKEN }, (err, user) => { console.log(err, user) })

/*client.get('users/self/media/recent', { access_token: ACCESS_TOKEN, count: 1 }, (error, media) => {
  console.log(error, media)
})*/
