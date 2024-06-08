module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          "@components": "./src/components",
        },
      },
    ],
  ],
  "plugins": [["@babel/plugin-proposal-decorators", { "legacy": true }]]
};
