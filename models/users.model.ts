import { Schema, model } from "mongoose";
import { IUser } from "../interface/users.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    roles: [
        {
          type: String,
          required: true,
        },
      ],
    password: { type: String, required: false },
    recoveryPassCode: { type: String, required: false },
    signInQuantity: { type: Number, required: false },
    watchedVideos: [
        {
          type: String,
          required: true,
        },
      ],
    userAnalytics: {
      tutorial: { type: Number, required: true },
      harvestInfo: { type: Number, required: true },
      checklist: {
          window1: { type: Number, required: true },
          window2: { type: Number, required: true },
          window3: { type: Number, required: true },
          termometer: { type: Number, required: true },
          kiln: { type: Number, required: true },
          door1: { type: Number, required: true },
          door2: { type: Number, required: true },
          panel: { type: Number, required: true }
      },
      navigation: {
          left: { type: Number, required: true },
          right: { type: Number, required: true }
      },
      panel: {
          temperatureSpeedPlus: { type: Number, required: true },
          temperatureSpeedMinus: { type: Number, required: true },
          dryTemperaturePlus: { type: Number, required: true },
          dryTemperatureMinus: { type: Number, required: true },
          wetTemperaturePlus: { type: Number, required: true },
          wetTemperatureMinus: { type: Number, required: true }
      },
      fastFoward: { type: Number, required: true },
      leafCheck: {
          yellowing: { type: Number, required: true },
          withening: { type: Number, required: true },
          leafDry: { type: Number, required: true },
          stemDry: { type: Number, required: true }
      }
    }
});

userSchema.set("timestamps", true);
userSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export default model("users", userSchema);