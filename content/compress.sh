mkdir -p tmp/css

java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type css --line-break 200 -o tmp/css/00_reset.css  css/reset.css
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type css --line-break 200 -o tmp/css/10_style.css  css/style.css
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type css --line-break 200 -o tmp/css/20_pikachoose.css  css/pikachoose.css
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type css --line-break 200 -o css/ie-min.css  css/ie.css

cat tmp/css/* > css/das-site.css





mkdir -p tmp/js

mkdir -p tmp/js/prod
mkdir -p tmp/js/ie

java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type js --line-break 200 -o tmp/js/prod/10_easySlider.js js/plugins/easySlider1-7-custom.js
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type js --line-break 200 -o tmp/js/prod/20_scrollTo.js js/plugins/jquery-scrollTo-1.4.2-min.js
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type js --line-break 200 -o tmp/js/prod/30_localscroll.js js/plugins/jquery-localscroll-1.2.7-min.js
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type js --line-break 200 -o tmp/js/prod/40_pikachoose.js js/plugins/jquery-pikachoose-full.js
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type js --line-break 200 -o tmp/js/prod/50_init.js js/init.js

cat tmp/js/prod/* > js/das-js.js

cp js/libs/dd_belatedpng.js tmp/js/ie/10_dd_belatedpng.js
java -jar /usr/share/yui/yuicompressor-2.4.6.jar --type js --line-break 200 -o tmp/js/ie/20_png-fix.js js/png-fix.js

cat tmp/js/ie/* > js/png-fix-min.js

rm -rf tmp

