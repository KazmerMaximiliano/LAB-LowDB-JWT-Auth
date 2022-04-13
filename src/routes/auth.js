import { Router } from "express";
const router = Router();

import { login, user } from "../controllers/auth.controller.js";
import { verifyToken } from "../libs/verifyToken.js";

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of the user
 *        email:
 *          type: string
 *          description: the email of the user
 *      example:
 *        id: 9a0d589b-053e-4b5e-a3f9-4b8de6df36b5
 *        email: test@mail.com
 *    Auth:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        auth:
 *          type: boolean
 *          description: whether the user is authenticated or not
 *        message:
 *          type: string
 *          description: the message to display to the user
 *        token:
 *          type: string
 *          description: the JWT token
 *      example:
 *        auth: true
 *        email: Login successful
 *        token: NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ij
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API for authentication
 */

/**
 * @swagger
 * /login:
 *  post:
 *    summary: login
 *    tags: [Auth]
 *    parameters:
 *      - in: body
 *        name: Login Form
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *              description: the email of the user
 *            password:
 *              type: string
 *              description: the password of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Auth'
 *    responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *      400:
 *        description: User not found or wrong password or missing email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /user:
 *  post:
 *    summary: user
 *    tags: [Auth]
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        description: No token provided
 */
router.get("/user", verifyToken, user);

export default router;
