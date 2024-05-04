const mongoose = require("mongoose")
const watchSchema = mongoose.Schema({
watch_brand: String,
watch_type: {
    type: String,
    minlength:1,
    maxlength:8,

},
cost: {
    type: Number,
    min: 1,
    max: 200,
}
})
module.exports = mongoose.model("watch",
watchSchema)