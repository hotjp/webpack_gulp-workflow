var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
  // todo:提取路径列表
  var jsPath = path.resolve(srcDir, 'js', 'app');

  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    matchs = item.match(/(.+)\.js$/);
    console.log(matchs);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'js', 'app', item);
    }
  });
  console.log(JSON.stringify(files));
  return files;
}

module.exports = {
  //   cache: true,
  devtool: '#source-map',
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'dist/js/'),
    publicPath: 'dist/js/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    alias: {
      jquery$: srcDir + '/js/lib/jquery.js',
      lib: srcDir + '/js/lib',
      include: srcDir + '/js/include'
    }
  },
  plugins: [
    new CommonsChunkPlugin('common'),
    new uglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    })
  ]
};