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
 *           example: '2016-01-03'
 *         description: Start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: '2016-01-03'
 *         description: End date
 *       - in: query
 *         name: minCount
 *         schema:
 *           type: integer
 *           example: 3000
 *         description: lower bound of aggregated counts
 *       - in: query
 *         name: maxCount
 *         schema:
 *           type: integer
 *           example: 5000
 *         description: upper bound of aggregated counts
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/responses/Records'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/responses/BadRequest'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/responses/NotFound'
 *       "500":
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/responses/ServerError'
 */
