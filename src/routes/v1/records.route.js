const express = require('express');
const recordController = require('../../controllers/record.controller');
const validate = require('../../middlewares/validate');
const recordValidation = require('../../validations/record.validation');

const router = express.Router();

router.route('/').post(validate(recordValidation.getRecords), recordController.getRecords);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Records query
 */

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Filter records.
 *     description: Filter records by date and counts.
 *     tags: [Records]
 *     requestBody:
 *       required: false
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date
 *       - in: query
 *         name: minCount
 *         schema:
 *           type: integer
 *         description: lower bound of aggregated counts
 *       - in: query
 *         name: maxCount
 *         schema:
 *           type: integer
 *         description: upper bound of aggregated counts
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Record'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/ServerError'
 */
