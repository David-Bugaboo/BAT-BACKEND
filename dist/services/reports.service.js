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
exports.ReportsService = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const reports_model_1 = __importDefault(require("../models/reports.model"));
class ReportsService {
    getAllReports() {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield reports_model_1.default.find();
            return reports;
        });
    }
    createReport(userEmail, newReportData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReport = new reports_model_1.default(Object.assign(Object.assign({}, newReportData), { userEmail }));
            console.log(newReport);
            yield newReport.save();
            return newReport;
        });
    }
    getReportsByUserEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield reports_model_1.default.find({ userEmail: userEmail });
            return reports;
        });
    }
    getReportsSummary(startAt, endAt) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(startAt);
            const endDate = new Date(endAt);
            const totalOfUsers = yield users_model_1.default.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            });
            const allReports = yield reports_model_1.default.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            });
            const totalOfReports = allReports.length;
            const sumAllRealSeconds = allReports.reduce((acc, report) => acc + report.realSeconds.reduce((acc, time) => acc + time), 0);
            const allRealSecondsConvertedToHours = Number((sumAllRealSeconds / 3600).toFixed(2));
            const [totals] = yield reports_model_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalOfScore: { $sum: "$score" },
                    },
                },
            ]);
            const [totalOfWatchedVideos] = yield users_model_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: { $size: "$watchedVideos" } },
                    },
                },
            ]);
            const averageOfScore = Number(((totals === null || totals === void 0 ? void 0 : totals.totalOfScore) / totalOfReports).toPrecision(2));
            const qualities = {};
            allReports.forEach((report) => {
                if (report.quality in qualities) {
                    qualities[`${report.quality}`] += 1;
                }
                else {
                    qualities[`${report.quality}`] = 1;
                }
            });
            const qualityMostEvidentCount = Object.values(qualities);
            const qualityMostEvident = Object.keys(qualities).find((quality) => qualities[quality] === Math.max(...qualityMostEvidentCount));
            return {
                totalOfUsers: totalOfUsers,
                totalOfUsedTime: allRealSecondsConvertedToHours,
                totalOfWatchedVideos: (_a = totalOfWatchedVideos === null || totalOfWatchedVideos === void 0 ? void 0 : totalOfWatchedVideos.total) !== null && _a !== void 0 ? _a : 0,
                averageOfCureQuality: qualityMostEvident !== null && qualityMostEvident !== void 0 ? qualityMostEvident : "Não definido",
                averageOfScore: !averageOfScore ? 0 : averageOfScore,
            };
        });
    }
}
exports.ReportsService = ReportsService;
exports.default = new ReportsService();
//# sourceMappingURL=reports.service.js.map