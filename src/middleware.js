module.exports = (ns => {
  ns.checkUID = function(req, res, next) {
    if (req.header('X-UID') === '1234') return next();
    next(new Error('Wrong X-UID'));
  };
  ns.errorHandler = async function (err) {
    //do something with error
    await console.error(err.message || JSON.stringify(err));
  };
  return ns;
})({});
