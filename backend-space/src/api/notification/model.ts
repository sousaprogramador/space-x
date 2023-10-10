import mongoose, { Schema, Document } from 'mongoose';
import dayjs from "dayjs";

export interface INotification extends Document {
    message: String,
    status: "success" | "failure",
    view: (bool?: boolean) => any
}

const msgs: { success: string, failure: string } = {
    success: "Atualização feita com sucesso em",
    failure: "Falha na atualização em"
}

const notificationSchema = new Schema(
    {
        message: {
            type: String
        },
        status: {
            type: String,
            default: null,
            enum: ["success", "failure"],
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (obj, ret) => {
                delete ret._id;
            },
        },
    }
);

notificationSchema.methods = {
    view(full: boolean = false) {
        try {
            const view = {
                // simple view
                id: this.id,
                message: `${msgs[this.status as "success" | "failure"]} ${dayjs(this.createdAt).format("DD/MM/YYYY hh:mm")}`,
                status: this.status,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            }

            return full ? { ...view } : view;
        } catch (error) {
            console.log(error)
        }
    },
};

const model = mongoose.model<INotification>('Notification', notificationSchema);

export const schema = model.schema;
export default model;
