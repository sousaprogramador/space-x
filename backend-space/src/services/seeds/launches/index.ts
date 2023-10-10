import { lauchesCountDocuments, lauchesInsertMany } from "../../../api/launches/controllers"
import { createNotification, deleteNotification } from "../../../api/notification/controllers";
import { config } from "../../../config";
import fetch from "../../fetch";

interface IResponse {
    totalDocs: number
}

export const saveLaunches = async () => {
    try {
        const count = await lauchesCountDocuments();
        const data = await getLauches();
        const now = new Date();

        return count === 0
            ? await lauchesInsertMany(data.map((e: any) => ({ ...e, launch_id: e.id || null, createdAt: now, updatedAt: now })))
                .then(async () => {
                    return await deleteNotification()
                        .then(async () => {
                            const not = await createNotification("success");
                            console.log(not)
                        });
                })
            : false
    } catch (error) {
        await deleteNotification();
        await createNotification("failure");
        console.log(error)
    }
}


export const getLauches = async () => {
    const json = await getTotalDocs()
        .then(async (totalDocs) =>
            await fetch.post("/launches/query", getOptions(totalDocs))
                .then(res => res.data.docs)
                .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    return json || []
}

export const getOptions = (total: number) => ({
    "options": {
        "populate": ["rocket"],
        "limit": total,
    }
})

export const getTotalDocs = async () =>
    await fetch.post<IResponse>("/launches/query", { "options": { "limit": 10 } })
        .then(res => res.data)
        .then(data => data.totalDocs)