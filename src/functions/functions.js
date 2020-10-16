import { day } from "@/constants/mapDay";
import {night} from "@/constants/mapNight.js";

export function shiftNow() {
    let date = new Date(); 
    if (date.getHours()>=8 && date.getHours()<20 ) {
        return 1
    }
    return 2
    }
export function dateNow() {
    let date = new Date(); 
    if (date.getHours()<8 ) {
      date.setDate(date.getDate()-1)
      return date.getDate()+'.'+String(date.getMonth()+1) + '.' + date.getFullYear()
    }
    else if (date.getHours()>=8 && date.getHours()<20 ) {
      return date.getDate()+'.'+String(date.getMonth()+1) + '.' + date.getFullYear()
    }
    else {
      return date.getDate()+'.'+String(date.getMonth()+1) + '.' + date.getFullYear()
    }
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

export function  getIcons(state, type, num) {
  if (type=='kran') {   // 123
    if (state=='180'){
      return `${type}/blue/${num}.png`
    }
    else if (state=='90_1' || state=='90_2'){
      return `${type}/black/${num}.png`
    }
    else if (state=='stay'){
      return `${type}/yellow/${num}.png`
    }
    else if (state=='no_power'){
      return `${type}/red/${num}.png`
    }
    else if (state=='long_no_power'){
      return `${type}/gray/${num}.png`
    }
    else {
      return `${type}/green/${num}.png`
    }

  }
  if (type=='usm') {
    if (state=='work'){
      return `${type}/blue/${num}.png`
    }
    else if (state=='stay'){
      return `${type}/yellow/${num}.png`
    }
    else if (state=='no_power'){
      return `${type}/red/${num}.png`
    }
    else if (state=='long_no_power'){
      return `${type}/gray/${num}.png`
    }
    else {
      return `${type}/green/${num}.png`
    }
  }
}


