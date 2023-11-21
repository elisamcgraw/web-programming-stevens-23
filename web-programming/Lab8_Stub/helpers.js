
const helpers = {
  
    isValidString(str, varName, minLength = 1) {
    console.log('Inside isValidString');
    console.log(`Received Type: ${typeof str}, Value: ${str}`);
    str = str?.trim(); 
    if (typeof str !== 'string' || str.length < minLength) {
      throw new Error(`${varName} cannot be empty or just spaces.`);
    }
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
        throw new Error(`Please enter a valid ${varName.toLowerCase()}, not just numbers.`);
    }
    if (typeof str !== 'string' || str.trim().length === 0) {
        throw new Error('String too short after trimming');
      }
    console.log('Exiting isValidString without error');
    return true;
    },


    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    }
};

export default helpers;
