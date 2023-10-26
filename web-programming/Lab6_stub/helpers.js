// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

// helper.js
import { ObjectId } from "mongodb";

export const isValidString = (str, minLength = 1) => {
    if (!str || typeof str !== "string" || str.trim().length < minLength) {
      return false;
    }
    return true;
  };
  
  export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  export const isValidDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(date)) return false;

    const [month, day, year] = date.split("/");
    const d = new Date(year, month - 1, day);
    return d && d.getMonth() === month - 1 && d.getDate() === parseInt(day);
};

  
  export const isValidTime = (time) => {
    const regex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/;
    return regex.test(time);
  };
  
  export const minutesDifference = (start, end) => {
    const [sHour, sMinutePart] = start.split(':');
    const [sMinute, sAMPM] = sMinutePart.split(' ');
    const [eHour, eMinutePart] = end.split(':');
    const [eMinute, eAMPM] = eMinutePart.split(' ');
  
    let startInMinutes = parseInt(sHour) * 60 + parseInt(sMinute);
    if (sAMPM === 'PM' && sHour !== '12') startInMinutes += 12 * 60;
  
    let endInMinutes = parseInt(eHour) * 60 + parseInt(eMinute);
    if (eAMPM === 'PM' && eHour !== '12') endInMinutes += 12 * 60;
  
    return endInMinutes - startInMinutes;
  };
  
  export const isValidState = (state) => {
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    return states.includes(state);
  };

  
  export const isValidZip = (zip) => {
    return /^[0-9]{5}(-[0-9]{4})?$/.test(zip); 
  }
  
  export const isValidObjectId = (id) => {
    return ObjectId.isValid(id);
  };
  
  export const isBoolean = (value) => {
    return typeof value === 'boolean';
  };
  
  export const isIntegerAndPositive = (number) => {
    return typeof number === 'number' && Number.isInteger(number) && number > 0;
  };
  
  export const isValidPrice = (price) => {
    return typeof price === 'number' && price >= 0 && ((price % 1 === 0) || (price * 100 % 1 === 0));
  };
  