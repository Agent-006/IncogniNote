import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

export const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

const MessageModel = mongoose.models.messages as mongoose.Model<Message> || mongoose.model<Message>("messages", messageSchema)

export default MessageModel;