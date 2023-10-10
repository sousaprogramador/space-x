import schedule from "node-schedule";
import { saveLaunches } from "../seeds/launches";

const rule = new schedule.RecurrenceRule();

rule.hour = 9;
rule.minute = 0;

export const jobs = () => {
    console.log("** Scheduling tasks **")
    schedule.scheduleJob(rule, function () {

        console.log('**Atualiandao dados do lançamentos**');
        saveLaunches()
    });
    console.log("** completed Scheduling **")
    return;
}
