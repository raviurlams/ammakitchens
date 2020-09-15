#!/bin/bash
echo ".......... ..........  Pushing .......... .........."
git add .
git commit -m "new changes"
git push
ionic cap sync
echo ".......... .......... Pushing is Done .......... .........."
echo ".......... .......... Deleting www .tmp .sourcemaps. .......... .........."
rm -rf www .tmp .sourcemaps node_modules
npm install
echo ".......... .......... Deleting done. .......... .........."
ionic cordova build android --prod
echo ".......... .......... APK Created. .......... .........."
