import { Request, Response } from "express";
import { IUserAnalytic } from "../interface/userAnalytics.interface";
import usersService from "../services/users.service";
import { IReport } from "../interface/reports.interface";
import reportsService from "../services/reports.service";

class ReportsController {
    async getAllReports(req: Request, res: Response) {
        try {
            const request = await reportsService.getAllReports();

            return res.status(200).json(request);
        } catch (e: any) {
            console.error(e);
            return res.status(404).json({ message: "Was not possible to get reports"});
        }
    }

    async getReportsByUserEmail(req: Request, res: Response) {
        try {
            const request = await reportsService.getReportsByUserEmail(req.params.useremail);

            return res.status(200).json(request);
        } catch (e: any) {
            console.error(e);
            return res.status(404).json({ message: "Was not possible to get reports"});
        }
    }

    async createReport(req: Request, res: Response) {
        const report: IReport = req.body.reportData;
        const userEmail: string = req.body.userEmail;
        const analytics: IUserAnalytic = req.body.analytics;
        
        if(!report || !analytics || !userEmail) {
            return res.status(400).json({ message: "User email, report or analytics not found"});
        }

        try {
            const currentUser = await usersService.getUserByEmail(userEmail);
            if(!currentUser) {
                console.error(`Wasn't possible to create report to user ${userEmail}`);
            }
            
            await reportsService.createReport(userEmail, report);
            await usersService.registerUserAnalytics(userEmail, analytics);

            return res.status(201).json();
        } catch (e: any) {
            console.error(e);
            return res.status(404).json({ message: "Was not possible to create report"});
        }
    }

    async getReportsSummary(req: Request, res: Response) {
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;

        if(!startDate || !endDate) {
            return res.status(400).json({ message: "Start date or end date not found"});
        }

        try {
            console.log(`Building summary of reports for reports between ${startDate} and ${endDate}`);
            const request = await reportsService.getReportsSummary(startDate, endDate);

            return res.status(200).json(request);
        } catch (e: any) {
            console.error(e);
            return res.status(404).json({ message: "Was not possible to get reports"});
        }
    }
}

export default new ReportsController();