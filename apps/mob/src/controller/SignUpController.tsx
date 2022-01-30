import { API_BASE } from "@env";
import { IAthlete } from "../types";
import BaseController from "./BaseController";


export class SignUpController extends BaseController {
    constructor(){
        super()
    }

    signUp = async (athlete: IAthlete) => {
        try {
            const response = await fetch(`${API_BASE}/athlete`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: athlete.email,
                    password: athlete.password,
                    name: athlete.name,
                    roles: athlete.roles,
                    perf_level: athlete.perfLevel
                })
            });
            if (await response.status != 201) {
                throw Error('Response code ' + await response.status + ': ' + await response.text())
            }
            const json = await response.json();
        } catch (error) {
            console.error(error);
            this.logError(error);
        }
    }
}