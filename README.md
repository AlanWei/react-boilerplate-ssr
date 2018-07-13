# React Boilerplate SSR

> Universal React v16.0 boilerplate

## Getting Started

### Client Side Development

```bash
cd client
yarn install
yarn dev
```

Navigate to `http://localhost:8080`

### Server Side Development

```bash
cd client
yarn install
yarn run dev:server

cd server
yarn install
yarn watch
```

Navigate to `http://localhost:3000`

---

# CHANGLOG
### 2018.07.13
1. Replace `react-router-redux` with `connected-react-router`.
### 2018.07.03
1. Upgrade to ESLint 5.
2. Required Node.js version is either `8.10.0` above or `9.10.0` above.
### 2018.05.20
1. Better `client/src/app` folder structure.
### 2018.04.11
1. Upgrade to Webpack 4.
2. Temporarily remove `react-loadable` for easy SSR.
### 2018.02.07
1. Better webpack configuration.
### 2018.02.05
1. Update dependencies for both client & server side.
2. Add server side eslint check.
3. Add server side XSS protection.
> For pure client side version, please visit [react-boilerplate](https://github.com/AlanWei/react-boilerplate)
