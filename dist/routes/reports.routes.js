"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRouter = void 0;
const express_1 = __importDefault(require("express"));
const reports_controller_1 = __importDefault(require("../controllers/reports.controller"));
exports.reportRouter = express_1.default.Router();
exports.reportRouter.get('/reports', reports_controller_1.default.getAllReports);
exports.reportRouter.post('/reports', reports_controller_1.default.createReport);
exports.reportRouter.get('/reports/summary', reports_controller_1.default.getReportsSummary);
exports.reportRouter.get('/reports/:useremail', reports_controller_1.default.getReportsByUserEmail);
//# sourceMappingURL=reports.routes.js.map