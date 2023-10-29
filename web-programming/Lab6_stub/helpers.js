import { ObjectId } from "mongodb";
export {ObjectId};

const helpers = {
  
  
    isValidString(str, varName, minLength = 1) {
    console.log('Inside isValidString');
    console.log(`Received Type: ${typeof str}, Value: ${str}`);
    if (!str) {
        console.log('Error: No value supplied');
        throw `Error: You must supply a ${varName}!`;
    }
    if (typeof str !== "string") {
        console.log('Error: Not a string');
        throw `Error: ${varName} must be a string!`;
    }
    str = str.trim();
    if (str.length < minLength) {
        console.log('Error: String too short after trimming');
        throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    }
    if (!isNaN(str)) {
        console.log('Error: String is numeric');
        throw `Error: ${str} is not a valid value for ${varName} as it only contains digits`;
    }
    console.log('Exiting isValidString without error');
    return true;
    },

    isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    },

    isValidDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!regex.test(date)) return false;

        const [month, day, year] = date.split("/");
        const d = new Date(year, month - 1, day);
        return d && d.getMonth() === month - 1 && d.getDate() === parseInt(day);
    },

    isValidTime(time) {
        const regex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/;
        return regex.test(time);
    },

    minutesDifference(start, end) {
        const [sHour, sMinutePart] = start.split(':');
        const [sMinute, sAMPM] = sMinutePart.split(' ');
        const [eHour, eMinutePart] = end.split(':');
        const [eMinute, eAMPM] = eMinutePart.split(' ');

        let startInMinutes = parseInt(sHour) * 60 + parseInt(sMinute);
        if (sAMPM === 'PM' && sHour !== '12') startInMinutes += 12 * 60;

        let endInMinutes = parseInt(eHour) * 60 + parseInt(eMinute);
        if (eAMPM === 'PM' && eHour !== '12') endInMinutes += 12 * 60;

        return endInMinutes - startInMinutes;
    },

    isValidState(state) {
        const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
        return states.includes(state);
    },

    isValidZip(zip) {
        return /^[0-9]{5}(-[0-9]{4})?$/.test(zip);
    },

    isValidObjectId(id) {
        return /^[a-fA-F0-9]{24}$/.test(id);
    },

    isBoolean(value) {
        return typeof value === 'boolean';
    },

    isIntegerAndPositive(number) {
        return typeof number === 'number' && Number.isInteger(number) && number > 0;
    },

    isValidPrice(price) {
        return typeof price === 'number' && price >= 0 && ((price % 1 === 0) || (price * 100 % 1 === 0));
    },

    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    },

    checkStringArray(arr, varName) {
        if (!arr || !Array.isArray(arr)) throw `You must provide an array of ${varName}`;
        for (let i in arr) {
            if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
                throw `One or more elements in ${varName} array is not a string or is an empty string`;
            }
            arr[i] = arr[i].trim();
        }

        return arr;
    }
};

export default helpers;
