module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          'react-dom': '@hot-loader/react-dom',
          'src/*': ['./src/*'],
          // '@': './src',
        },
        extensions: ['.js', '.jsx'],
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        'react-hot-loader/babel',
        'effector/babel-plugin',
        [
          '@babel/transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
    },
  },
};
