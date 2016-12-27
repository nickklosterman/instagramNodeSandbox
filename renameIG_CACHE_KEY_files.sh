#!/bin/bash
echo "This script will rename instagram files downloaded with the ??ig_cache_key appeneded to their name"
echo "Execute the script in the directory where the files to be renamed live."
echo "bash ${0}"
for name in *?ig_cache_key=*
do

    newName=${name%%?ig_cache_key*}
    echo $name $newName
    mv $name $newName
done
