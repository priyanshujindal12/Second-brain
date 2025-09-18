import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://priyanshu:PRI123yan@cluster0.hwoestu.mongodb.net/secondbrainly");

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const usermodel = model("user", userSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
});
const LinkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: "user", required: true, unique: true },
});
export const Linkmodel=model("Links", LinkSchema);
const ContentModel=model("Content", ContentSchema);
// ✅ named exports
export { usermodel, ContentModel };
