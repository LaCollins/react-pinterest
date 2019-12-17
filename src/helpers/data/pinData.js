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

export default { getPinByBoardId };
