rm -rf www .tmp .sourcemaps node_modules
ionic serve -l
ionic cordova emulate android

ionic cordova build android --prod --release --optimizejs --minifyjs --minifycss
ionic cordova build android --prod --release

ionic cordova platform rm android
ionic cordova platform add android
ionic cordova resources android
ionic cordova prepare android
ionic cordova run android
