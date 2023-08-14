import express, { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import reportsController from "../controllers/reports.controller";



export const reportRouter = express.Router();

reportRouter.get('/reports',reportsController.getAllReports)

reportRouter.post('/reports',reportsController.createReport)

reportRouter.get('/reports/summary',reportsController.getReportsSummary)

reportRouter.get('/reports/:useremail',reportsController.getReportsByUserEmail)