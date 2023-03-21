const path = require('path');

module.exports = {
  entry: './src/index.ts', // El archivo de entrada de tu proyecto
  output: {
    filename: 'bundle.js', // El nombre del archivo JavaScript de salida
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
