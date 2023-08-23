import usersModel from "../models/users.model";
import { ReportsSummary } from "../interface/reports-summary.interface";
import { IReport } from "../interface/reports.interface";
import reportsModel from "../models/reports.model";

export class ReportsService {
  async getAllReports(): Promise<IReport[]> {
    const reports = await reportsModel.find();

    return reports;
  }

  async createReport(
    userEmail: string,
    newReportData: IReport
  ): Promise<IReport> {
    const newReport = new reportsModel({ ...newReportData, userEmail });
    console.log(newReport);
    await newReport.save();

    return newReport;
  }

  async getReportsByUserEmail(userEmail: string): Promise<IReport[] | null> {
    const reports = await reportsModel.find({ userEmail: userEmail });
    return reports;
  }

  async getReportsSummary(
    startAt: string,
    endAt: string
  ): Promise<ReportsSummary> {
    const startDate: Date = new Date(startAt);
    const endDate: Date = new Date(endAt);

    const totalOfUsers = await usersModel.countDocuments({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const allReports = await reportsModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalOfReports = allReports.length;

    const sumAllRealSeconds = allReports.reduce(
      (acc, report) =>
        acc + report.realSeconds.reduce((acc, time) => acc + time),
      0
    );

    const allRealSecondsConvertedToHours = Number(
      (sumAllRealSeconds / 3600).toFixed(2)
    );

    const [totals] = await reportsModel.aggregate([
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

    const [totalOfWatchedVideos] = await usersModel.aggregate([
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

    const averageOfScore = Number(
      (totals?.totalOfScore / totalOfReports).toPrecision(2)
    );

    const qualities = {} as { [key: string]: number };
    allReports.forEach((report) => {
      if (report.quality in qualities) {
        qualities[`${report.quality}`] += 1;
      } else {
        qualities[`${report.quality}`] = 1;
      }
    });

    const qualityMostEvidentCount = Object.values(qualities);
    const qualityMostEvident = Object.keys(qualities).find(
      (quality) => qualities[quality] === Math.max(...qualityMostEvidentCount)
    );

    return {
      totalOfUsers: totalOfUsers,
      totalOfUsedTime: allRealSecondsConvertedToHours,
      totalOfWatchedVideos: totalOfWatchedVideos?.total ?? 0,
      averageOfCureQuality: qualityMostEvident ?? "Não definido",
      averageOfScore: !averageOfScore ? 0 : averageOfScore,
    };
  }
}

export default new ReportsService();
