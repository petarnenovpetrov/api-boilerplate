const { Schema, model } = require('mongoose');
module.exports = (ns => {
  ns.product = (() => {
    const ProductSchema = new Schema({
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: [true, 'Product name required'],
        unique: true,
      },
      price: {
        type: Number,
        required: [true, 'Product price required!'],
      },
      quantyty: {
        type: Number,
        validate: {
          validator: function(v) {
            return (v ^ 0) === v;
          },
          message: props => `${props.value} is not a valid quantyty!`,
        },
      },
    });
    return model('Product', ProductSchema);
  })();
  return ns;
})({});
