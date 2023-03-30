#! /bin/bash
rm -r indexPageBuilder/dist/*
cd ./indexPageBuilder
npm run webpack
cd ..
rm -rf ./index*js ./index*html ./assets ./styles
mv indexPageBuilder/dist/* .

