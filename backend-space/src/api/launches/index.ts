import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index, stats } from './controllers'

const router = new (Router as any)();

/**
    * @swagger
    *  /api/launches:
    *      get:
    *          summary: Obter informações sobre lançamentos
    *          description: Obter informações sobre lançamentos
    *          responses:
    *              '200':
    *                  description: Sucesso. Retorna as informações sobre os lançamentos
    *              '404':
    *                  description: sem informação para compartilhar
    *      parameters:
    *          - name: limit
    *            in: query
    *            description: Limit docs
    *            schema:
    *              type: string
    *              format: string    
    *          - name: page
    *            in: query
    *            description: Current page
    *            schema:
    *              type: string
    *              format: string
    */

router.get('/',
    query({
        page: {
            type: Number,
            default: 1
        },
    }),
    index
)

/**
 * @swagger
 * api/launches/stats:
 *   get:
 *     summary: Obter informações sobre estáticas dos lançamentos por foguetes
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma lista de lançamentos.
 *         content: 
 *          'application/json':
 *              schema:
 *                  totalDocs: 205
 *       404:
 *         description: Sem informação para compatilhar
 */
router.get('/stats',
    query({
        page: {
            type: Number,
            default: 1
        },
    }),
    stats
)

export default router
