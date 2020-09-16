import { day } from "@/constants/mapDay";
import {night} from "@/constants/mapNight.js";

export function shiftNow() {
    let date = new Date(); 
    if (date.getHours()<20 &&  date.getHours()>8 ) {
        return 1
    }
    return 2
    }
export function dateNow() {
    let date = new Date(); 
    return date.getDate()+'.'+String(date.getMonth()+1) + '.' + date.getFullYear()
    }


export function hoursProgress(shift) {
    if (shift==1) {
        return ["║",  "╵","│","╵", "09",  "╵","│","╵", "10",  "╵", "│","╵","11",  "╵","│","╵", "12",  "╵","│","╵", "13",  "╵","│","╵", "14",  "╵","│","╵", "15",  "╵","│","╵", "16",  "╵","│","╵", "17",  "╵","│","╵", "18",  "╵","│","╵", "19",  "╵","│","╵",  "║"] 
    }
        return ["║",  "╵","│","╵", "21",  "╵","│","╵", "22",  "╵", "│","╵","23",  "╵","│","╵", "00",  "╵","│","╵", "01",  "╵","│","╵", "02",  "╵","│","╵", "03",  "╵","│","╵", "04",  "╵","│","╵", "05",  "╵","│","╵", "06",  "╵","│","╵", "07",  "╵","│","╵",  "║"]
}


export function themeMap(shift) {
        if (shift == 1) {
            return day
        }
        return night
    }
                



