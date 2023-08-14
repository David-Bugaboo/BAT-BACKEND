import { Schema, model } from "mongoose";
import { IReport } from "../interface/reports.interface";

const reportSchema = new Schema<IReport>({
  userEmail: { type: String, required: true },
  cenaryClimate: { type: String, required: true },
  cenaryMaturity: { type: String, required: true },
  idealMinutes: { type: [Number], required: true },
  realSeconds: { type: [Number], required: true },
  simulatedMinutes: { type: [Number], required: true },
  checkedItems: { type: [String], required: true },
  leafChecks: { type: Number, required: true },
  score: { type: Number, required: true },
  quality: { type: String, required: true },
  mistakesLog: { type: [String], required: true },
  date: { type: String, required: true },
});

reportSchema.set("timestamps", true);
reportSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default model("reports", reportSchema);
