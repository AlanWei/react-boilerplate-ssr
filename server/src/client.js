import fs from 'fs';
import path from 'path';

const DATA_FOLDER = process.env.CLIENT_FOLDER || 'current';

export const getClientFolders = () => {
  const APP_DATA = path.resolve(__dirname, '..', 'data', 'app', DATA_FOLDER);
  const SERVER_DATA = path.join(APP_DATA, 'server');

  return {
    APP_DATA,
    SERVER_DATA,
  };
};

export const clientVersionMiddleware = (req, res, next) => {
  res.locals.clientFolders = getClientFolders();
  next();
};

export const getClientInstance = (folders) => {

  // [SERVER] Get the manifest to find out what server.js was hashed to
  const manifest = require(`${folders.SERVER_DATA}/manifest.json`);
  const filename = manifest['server.js'];

  // [SERVER] Get the application code.
  const code = require(`${folders.SERVER_DATA}/${filename}`);

  // [SERVER] Check if es6 module
  const app = code && code.__esModule ? code.default : code;

  // [CLIENT] Html files
  // Only read the file when we need to execute it
  // Prevents pre-mature reading when application fails.
  const html = () => fs.readFileSync(path.join(folders.APP_DATA, 'index.html'), 'utf8');
  const htmlError = () => fs.readFileSync(path.join(folders.APP_DATA, 'error.html'), 'utf8');

  return {
    app,
    html,
    htmlError,
  };
};
