const app = require('./app');

//TODO: add from env
const port = 3000;

app.listen(port, () => {
  console.log(`Server start at port ${port}`);
});
