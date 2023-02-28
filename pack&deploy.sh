#! /bin/bash
./indexPageBuilder/pack.sh
rm -rf ./index*js ./index*html ./assets ./styles
cp ./indexPageBuilder/dist/* .


