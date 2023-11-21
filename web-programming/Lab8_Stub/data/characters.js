import axios from 'axios';
import md5 from 'md5';

const publickey = 'dcf7e16502eb0413d467dc3f1c4ce2fc';
const privatekey = 'c172136ff3d7bcaca7756934f29c569109ba9fbc'; 


const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

export const searchCharacterByName = async (name) => {
  const ts = Math.floor(new Date().getTime() / 1000);
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  console.log({ ts, publickey, privatekey, hash });

  const searchUrl = `${baseUrl}?nameStartsWith=${encodeURIComponent(name)}&ts=${ts}&apikey=${publickey}&hash=${hash}&limit=15`;
  console.log(searchUrl);
  try {
    const response = await axios.get(searchUrl);
    if (response.data.data.results.length === 0) {
      console.log(`No results found for "${name}".`);
      return []; // Return an empty array if no results are found
    }
    return response.data.data.results;
  } catch (error) {
    console.error('Error in searchCharacterByName: ', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Failed to retrieve character data.');
  }
};

export const searchCharacterById = async (id) => {
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const characterUrl = `${baseUrl}/${id}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

  try {
    const response = await axios.get(characterUrl);
    if (!response.data || !response.data.data.results.length) {
      throw new Error(`Character with ID ${id} not found.`);
    }
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error in searchCharacterById: ', error.message);
    throw new Error('Failed to retrieve character by ID.');
  }
};
