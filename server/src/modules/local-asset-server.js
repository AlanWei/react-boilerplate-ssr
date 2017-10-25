const localAssetServer = (req, res) => {
  const file = req.params[0] ? req.params[0] : 'index.html';

  res.sendFile(`assets/${file}`, {
    root: res.locals.clientFolders.APP_DATA,
  });
};

export default localAssetServer;
