echo 'starting...'

mkdir -p tmp/css

echo 'compresing css...'

java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type css --line-break 200 -o tmp/css/00_reset.css  output/css/reset.css
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type css --line-break 200 -o tmp/css/10_style.css  output/css/style.css
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type css --line-break 200 -o tmp/css/15_clients.css  output/css/clients.css
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type css --line-break 200 -o tmp/css/20_pikachoose.css  output/css/pikachoose.css
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type css --line-break 200 -o output/css/ie-min.css  output/css/ie.css

cat tmp/css/* > output/css/das-site.css





mkdir -p tmp/js

mkdir -p tmp/js/prod
mkdir -p tmp/js/ie

echo 'compresing js...'
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type js --line-break 200 -o tmp/js/prod/10_easySlider.js output/js/plugins/easySlider1-7-custom.js
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type js --line-break 200 -o tmp/js/prod/20_scrollTo.js output/js/plugins/jquery-scrollTo-1.4.2-min.js
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type js --line-break 200 -o tmp/js/prod/30_localscroll.js output/js/plugins/jquery-localscroll-1.2.7-min.js
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type js --line-break 200 -o tmp/js/prod/40_pikachoose.js output/js/plugins/jquery-pikachoose-full.js
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type js --line-break 200 -o tmp/js/prod/50_init.js output/js/init.js

cat tmp/js/prod/* > output/js/das-js.js

cp output/js/libs/dd_belatedpng.js tmp/js/ie/10_dd_belatedpng.js
java -jar /usr/share/yui/yuicompressor-2.4.7.jar --type js --line-break 200 -o tmp/js/ie/20_png-fix.js output/js/png-fix.js

cat tmp/js/ie/* > output/js/png-fix-min.js

# rm -rf tmp

echo 'Ta dan!'