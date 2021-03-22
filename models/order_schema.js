const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    AWBNo: {
        type: String,
        required: true,
        unique: true
    },
    Origin: {
        type: String,
        required:true
    },
    Dest: {
        type: String,
        required:true
    },
    Weight:{
        type: Number,
        required:true
    },
    ClientID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps:true
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;