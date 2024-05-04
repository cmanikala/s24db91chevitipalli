const mongoose = require("mongoose")
const watchSchema = mongoose.Schema({
watch_brand: String,
watch_type: String,
cost: Number
})
module.exports = mongoose.model("watch",
watchSchema)