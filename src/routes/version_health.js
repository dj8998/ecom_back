import express from 'express'
import { httpStatus } from '../constants'

const router = express.Router()

// Version Route
router.get('/version', (req, res, next) => {
  return res.json({ statusCode: httpStatus.OK, version: process.env.npm_package_version })
})

// Health check route
router.get('/health-check', (req, res, next) => {
  return res.json({ statusCode: httpStatus.OK, message: 'Healthy!!' })
})

export default router