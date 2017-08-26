#https://api.instagram.com/oauth/authorize/?client_id=ee820f4f45844f4d9f1d8b1f21683b25&redirect_uri=http://djinnius.com/null&response_type=code&scope=public_content,follower_list

#code = f87db8f5623f4daa825dad92378ea1de
#code with public_content permissions: 7547889a7ed34b2dbd2526531fdd4438
CODE=7547889a7ed34b2dbd2526531fdd4438
CODE=f8cfada0c8ac414381af25b3f9cdf0c6
curl -F 'client_id=ee820f4f45844f4d9f1d8b1f21683b25' \
    -F 'client_secret=fbaa81f2d37e4d7fb3e66abf181d4fd5' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=http://djinnius.com/null' \
    -F 'code=f8cfada0c8ac414381af25b3f9cdf0c6' \
    https://api.instagram.com/oauth/access_token


#{"access_token": "1274000443.ee820f4.8e1c70f88f74446ab8f353909972a836", "user": {"id": "1274000443", "username": "nick_klosterman", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg", "full_name": "", "bio": "", "website": ""}}
#{"access_token": "1274000443.ee820f4.8e1c70f88f74446ab8f353909972a836", "user": {"id": "1274000443", "username": "nick_klosterman", "profile_picture": "https://scontent-frx5-1.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg", "full_name": "", "bio": "", "website": ""}}
#{"access_token": "1274000443.ee820f4.8e1c70f88f74446ab8f353909972a836", "user": {"id": "1274000443", "username": "nick_klosterman", "profile_picture": "https://instagram.fsjk2-1.fna.fbcdn.net/t51.2885-19/11906329_960233084022564_1448528159_a.jpg", "full_name": "", "bio": "", "website": ""}}
