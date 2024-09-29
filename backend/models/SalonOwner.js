const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salonOwnerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salonName: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

salonOwnerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const SalonOwner = mongoose.model("SalonOwner", salonOwnerSchema);

module.exports = SalonOwner;
