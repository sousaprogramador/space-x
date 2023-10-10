import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controllers'

const router = new (Router as any)();

/**
  * @swagger
  *  /api/notification:
  *      get:
  *          summary: Obter informações sobre a atualização dos dados do lançamentos
  *          responses:
  *              '200':
  *                  description: Retorna a data da última atualização
  *                  content: 
  *                     'application/json':
  *                         schema:
  *                             type: object
  *              '404':
  *                  description: Sem informações para compartilhar
  */
router.get('/',
    query({}),
    index
)

export default router
