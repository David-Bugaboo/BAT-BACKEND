"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("reports", reportSchema);
//# sourceMappingURL=reports.model.js.map