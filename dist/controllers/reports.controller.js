"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const reports_service_1 = __importDefault(require("../services/reports.service"));
class ReportsController {
    getAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield reports_service_1.default.getAllReports();
                return res.status(200).json(request);
            }
            catch (e) {
                console.error(e);
                return res.status(404).json({ message: "Was not possible to get reports" });
            }
        });
    }
    getReportsByUserEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield reports_service_1.default.getReportsByUserEmail(req.params.useremail);
                return res.status(200).json(request);
            }
            catch (e) {
                console.error(e);
                return res.status(404).json({ message: "Was not possible to get reports" });
            }
        });
    }
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = req.body.reportData;
            const userEmail = req.body.userEmail;
            const analytics = req.body.analytics;
            if (!report || !analytics || !userEmail) {
                return res.status(400).json({ message: "User email, report or analytics not found" });
            }
            try {
                const currentUser = yield users_service_1.default.getUserByEmail(userEmail);
                if (!currentUser) {
                    console.error(`Wasn't possible to create report to user ${userEmail}`);
                }
                yield reports_service_1.default.createReport(userEmail, report);
                yield users_service_1.default.registerUserAnalytics(userEmail, analytics);
                return res.status(201).json();
            }
            catch (e) {
                console.error(e);
                return res.status(404).json({ message: "Was not possible to create report" });
            }
        });
    }
    getReportsSummary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            if (!startDate || !endDate) {
                return res.status(400).json({ message: "Start date or end date not found" });
            }
            try {
                console.log(`Building summary of reports for reports between ${startDate} and ${endDate}`);
                const request = yield reports_service_1.default.getReportsSummary(startDate, endDate);
                return res.status(200).json(request);
            }
            catch (e) {
                console.error(e);
                return res.status(404).json({ message: "Was not possible to get reports" });
            }
        });
    }
}
exports.default = new ReportsController();
//# sourceMappingURL=reports.controller.js.map