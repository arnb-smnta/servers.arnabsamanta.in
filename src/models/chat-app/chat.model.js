import { Schema } from "mongoose";
import { TypeOfGroupsEnum } from "../../constants";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    typeOfGroup: {
      type: String,
      enum: TypeOfGroupsEnum,
    },

    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    admin: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
