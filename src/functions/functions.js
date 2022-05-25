import { day } from "@/constants/mapDay";
import { night } from "@/constants/mapNight.js";

export function shiftNow() {
  let date = new Date();
  if (date.getHours() >= 8 && date.getHours() < 20) {
    return 1
  }
  return 2
}
export function dateNow() {
  let date = new Date();
  let result
  if (date.getHours() < 8) {
    date.setDate(date.getDate() - 1)
    result = addZero(date.getDate()) + '.' 
      + addZero(String(date.getMonth() + 1)) + '.' 
      + date.getFullYear()
  }
  else if (date.getHours() >= 8 && date.getHours() < 20) {
    result = addZero(date.getDate()) + '.' 
      + addZero(String(date.getMonth() + 1)) + '.' 
      + date.getFullYear()
  }
  else {
    result = addZero(date.getDate()) + '.' 
      + addZero(String(date.getMonth() + 1)) + '.' 
      + date.getFullYear()
  }
  return result
}

export function hoursProgress(shift) {
  if (shift == 1) {
    return ["║", "╵", "│", "╵", "09", "╵", "│", "╵", "10", "╵", "│", "╵", "11", "╵", "│", "╵", "12", "╵", "│", "╵", "13", "╵", "│", "╵", "14", "╵", "│", "╵", "15", "╵", "│", "╵", "16", "╵", "│", "╵", "17", "╵", "│", "╵", "18", "╵", "│", "╵", "19", "╵", "│", "╵", "║"]
  }
  return ["║", "╵", "│", "╵", "21", "╵", "│", "╵", "22", "╵", "│", "╵", "23", "╵", "│", "╵", "00", "╵", "│", "╵", "01", "╵", "│", "╵", "02", "╵", "│", "╵", "03", "╵", "│", "╵", "04", "╵", "│", "╵", "05", "╵", "│", "╵", "06", "╵", "│", "╵", "07", "╵", "│", "╵", "║"]
}


export function themeMap(shift) {
  if (shift == 1) {
    return day
  }
  return night
}

export function getIcons(state, type, num) {
  if (type == 'kran') {   // 123
    if (state == '180') {
      return `${type}/blue/${num}.png`
    }
    else if (state == '90_1' || state == '90_2') {
      return `${type}/black/${num}.png`
    }
    else if (state == 'stay') {
      return `${type}/yellow/${num}.png`
    }
    else if (state == 'no_power') {
      return `${type}/red/${num}.png`
    }
    else if (state == 'long_no_power') {
      return `${type}/gray/${num}.png`
    }
    else {
      return `${type}/green/${num}.png`
    }

  }
  if (type == 'usm') {
    if (state == 'work') {
      return `${type}/blue/${num}.png`
    }
    else if (state == 'stay') {
      return `${type}/yellow/${num}.png`
    }
    else if (state == 'no_power') {
      return `${type}/red/${num}.png`
    }
    else if (state == 'long_no_power') {
      return `${type}/gray/${num}.png`
    }
    else {
      return `${type}/green/${num}.png`
    }
  }
}

export function isVisible() {
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  function handleVisibilityChange() {
    if (document[hidden]) {
      return false
    } else {
      return true
    }
  }
  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This  Visibility API");
  } else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }
  return handleVisibilityChange()
}

export function showNotification(title, options) {
  Notification.requestPermission(function (result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, options);
        console.log(registration)
      });
    }
  });
}
export async function requestPermission() {
  const permission = await window.Notification.requestPermission();
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}
export function separateNumber(n){
  n = ''+ Math.round(n,0)
  return  n.replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
}

export function addZero(n) {
  if (Number(n)<10)  {
    return '0' + n
  }
  return n
}

export function tipShift(date, shift){
  let parts = date.split(".");
  if (shift==1) {
    return parts[0] + '.' + parts[1] +' 08:00 - ' + parts[0] + '.' + parts[1] + ' 20:00'
  }
  else {
    let nextDate = new Date(parts[2], parts[1] - 1, parts[0]);
    nextDate.setDate(nextDate.getDate() + 1);
    return parts[0] + '.' + parts[1] +' 20:00 - ' + addZero(nextDate.getDate()) + '.' + addZero(nextDate.getMonth()+1) + ' 08:00'
  }
}

 export function lastFlag(rfid) {
      if (rfid.length == 0) {
        return null
      } 
      const last = rfid.slice(-1)[0]
      const flagRfid = last[2]
      return flagRfid 
    }
export function lastRfid(rfid, fio) {
      if (rfid.length == 0) {
        return fio
      } 
      const last = rfid.slice(-1)[0]
      const fioRfid = last[0]
      const date =new Date(last[1])
      const hours  = addZero(date.getHours()) - 10 //TimeZone
      const minutes= addZero(date.getMinutes())
      return fioRfid + " " + hours + ":" + minutes
}
