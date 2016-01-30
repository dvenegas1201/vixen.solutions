/**
* Development variables
*/
module.exports = {
   env: 'development',

   buildDir: './public/assets',

   //libDir: './bower_components',

   srcImagesDir: './src/img/**/*.{jpg,png,svg}',
   buildImagesDir: './public/assets/img/',

   //buildTemplatesDir: './templates/**/*.swig',

   srcJavascriptInit: './src/js/initApp.js',
   buildJavascriptDir: './public/assets/js/',
   buildJavascriptFile: 'vixen.site.build.js',
   watchJavascriptDir: './src/js/**/*.js',

   srcSassInit: './src/sass/vixen.site.scss',
   buildSassDir: './public/assets/css/',
   buildSassFile: 'vixen.site.css',
   watchSassDir: './src/sass/**/*.scss',
   configSass: {
       compass: true,
       sourcemap: true,
       lineNumbers: true,
       style: "expanded",
       require: ["compass"]
   }

};
