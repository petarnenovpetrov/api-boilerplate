const { Schema, model } = require('mongoose');
module.exports = ((ns) => {
    ns.product = (() => {
        const ProductSchema = new Schema({
            name: {
                type: String,
                required: true,
                unique: true,
            },
        });
        return model('Product', ProductSchema);
    })();
    return ns;
})({});
