#!/bin/basah
#the url should be a post so click on a pictuer or 'copy link location' of one of the individual images and pass it to this script.
curl -s $1 | grep owner_user_id | sed 's/.*content="//;s/".*//' 
