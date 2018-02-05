import fs from 'fs';
import path from 'path';

const CLIENT_VERSION = process.env.CLIENT_VERSION;

const getClientFolders = () => {
  const CLIENT_FOLDER = path.resolve(__dirname, '..', '..', 'client', 'build', CLIENT_VERSION);
  const SERVER_FOLDER = path.join(CLIENT_FOLDER, 'server');

  return {
    CLIENT_FOLDER,
    SERVER_FOLDER,
  };
};

const getClientInstance = (folders) => {
  // [SERVER] Get the manifest to find out what server.js was hashed to
  const manifest = require(`${folders.SERVER_FOLDER}/manifest.json`);
  const filename = manifest['server.js'];

  // [SERVER] Get the application code.
  const code = require(`${folders.SERVER_FOLDER}/${filename}`);

  // [SERVER] Check if es6 module
  const app = code && code.__esModule ? code.default : code;

  // [CLIENT] Html files
  // Only read the file when we need to execute it
  // Prevents pre-mature reading when application fails.
  const html = () => fs.readFileSync(
    path.join(folders.CLIENT_FOLDER, 'index.html'), 'utf8',
  );

  return {
    app,
    html,
  };
};

const clientVersionMiddleware = (req, res, next) => {
  res.locals.clientFolders = getClientFolders();
  next();
};

export {
  getClientInstance,
  clientVersionMiddleware,
};
