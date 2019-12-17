import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((result) => {
      const pinObj = result.data;
      const pins = [];
      if (pinObj != null) {
        Object.keys(pinObj).forEach((pinId) => {
          const newPin = pinObj[pinId];
          newPin.id = pinId;
          pins.push(newPin);
        });
      }
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default { getPinByBoardId, getSinglePin, deletePin };
