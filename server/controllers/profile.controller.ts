import { ProfileService } from "../services/profile.service";
import { Request, Response } from "express";


export class ProfileController {
    static async getAllProfiles(req: Request, res: Response) {
        try {
            
            const profiles = ProfileService.getAllProfiles();
    
            return res.status(200).json({
                success: true,
                message: "Profiles fetched successfully",
                data: profiles,
            })
        } catch (error) {
            console.log("error fethcing  profiles ==>", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error,
            })
        }
    }

    static async getProfiileById(req: Request, res: Response){

        const { id } = req.params;

        // check x validate id
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid profile id",
            })
        }
try {
    const profile = ProfileService.getProfileById(id);



    if (!profile){
        return res.status(404).json({
            success: false,
            message: "Profile not found",
        })
    }

} catch (error) {
    console.log("error fethcing  profile ==>", error)
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
    })
}

    }}