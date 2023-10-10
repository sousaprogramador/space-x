import Notification from "./model";
import { Response } from 'express';

export const index = ({ }: any, res: Response, next: any) =>
    Notification.findOne({})
        .then((result) => {
            result
                ? res.status(200).json(result.view())
                : res.status(204).send();
        })
        .catch(error => {
            res.status(400).json({ "message": "Falha em obter status de atualização" })
            console.log(error);
            next();
        })

export const createNotification = async (status: "success" | "failure") => await Notification.create({ status });

export const deleteNotification = async () => await Notification.deleteMany({});
