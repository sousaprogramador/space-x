import Lauches from './model';
import { Response } from 'express';

export const index = (
    { querymen: { query, select, cursor } }: any,
    res: Response,
    next: any
) =>
    lauchesCountDocuments(query)
        .then((count: number) =>
            Lauches.find(query, select, cursor).then((lauches) => ({
                count,
                rows: lauches.map((lauche) => lauche.view()),
            }))
        )
        .then((res) => {
            const totalPages = getTotalPages(res.count, cursor.limit);
            const page = getPages(cursor.skip, cursor.limit);
            const hasNext = verifyHasNext(page, totalPages);
            const hasPrev = verifyHasPrev(cursor.skip);

            return {
                results: res.rows,
                totalDocs: res.count,
                page,
                totalPages,
                hasNext,
                hasPrev,
            };
        })
        .then((result) => {
            result.results.length
                ? res.status(200).json(result)
                : res.status(204).send();
        })
        .catch((error) => {
            res.status(400).json({ message: 'Falha em obter lista dos dados' });
            console.log(error);
            next();
        });

export const stats = async ({}: any, res: Response, next: any) => {
    try {
        const successLaunches = await lauchesCountDocuments(
            getQueryCount(true)
        );
        const failureLaunches = await lauchesCountDocuments(
            getQueryCount(false)
        );
        const launchCountByRocketName = await Lauches.aggregate(
            groupByRocketName()
        );
        const launchCountByDate = await Lauches.aggregate(groupByDate());

        return res.status(200).json({
            launchCountByName: launchCountByRocketName,
            successLaunches,
            failureLaunches,
            launchCountByDate,
        });
    } catch (error) {
        res.status(400).json({ message: 'Falha em obter dados do gráfico' });
        console.log(error);
        next();
    }
};

export const lauchesCountDocuments = async (query = {}) =>
    await Lauches.countDocuments(query);

export const lauchesInsertMany = async (data = []) =>
    await Lauches.insertMany(data);

export const groupByRocketName = () => [
    {
        $group: {
            _id: '$rocket.name',
            count: {
                $sum: 1,
            },
        },
    },
];

export const groupByDate = () => [
    {
        $group: {
            _id: {
                year: { $year: '$date_local' },
                name: '$rocket.name',
            },
            count: { $sum: 1 },
        },
    },
];

export const getQueryCount = (bool: boolean) => ({ success: bool });

export const getTotalPages = (total: number, limit: number) =>
    Math.ceil(total / limit);

export const getPages = (skip: number, limit: number) =>
    Math.ceil((skip + limit) / limit);

export const verifyHasPrev = (skip: number) => skip !== 0;

export const verifyHasNext = (page: number, totalPages: number) =>
    page < totalPages;
