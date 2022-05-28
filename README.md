# notistack-playground

## Setting up a plane React

```sh
npm init -y

npm install typescript ts-loader --save-dev
npx tsc --init

npm install react react-dom react-router-dom

npm install --save-dev @babel/core @babel/preset-react
touch .babelrc

npm install --save-dev webpack webpack-cli
npm install --save-dev babel-loader html-loader style-loader css-loader sass-loader
npm install --save-dev webpack-dev-server
touch webpack.config.js

npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
npx eslint --init
touch .prettierrc

npm install --save-dev husky lint-staged concurrently
```

## Install Storybook

```sh
npx storybook init
```

## Install Material UI

```sh
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```
