const localAssetServer = (req, res) => {
  const file = req.params[0] ? req.params[0] : 'index.html';
  console.log(file);

  res.sendFile(`assets/${file}`, {
    root: res.locals.clientFolders.CLIENT_FOLDER,
  });
};

export default localAssetServer;
