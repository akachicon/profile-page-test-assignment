export default (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.json({});
  }, 2000);
};
