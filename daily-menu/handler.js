import axios from 'axios';
import { success, failure } from './utils/responseUtils';

const ocrSpaceApiKey = process.env.OCR_SPACE_API_KEY;

export async function checkMenu(event, context, callback) {
  const url = 'http://www.homecafebg.com/wp-content/uploads/2017/05/FridaySpecials-5-page-001.jpg';
  const params = {
    apikey: ocrSpaceApiKey,
    headers: {
      apikey: ocrSpaceApiKey,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };

  await axios.get(`http://api.ocr.space/parse/imageurl?apikey=${ocrSpaceApiKey}&url=${url}`, params).then((resp) => {
    if (resp.data && resp.data.ParsedResults) {
      const parsedText = resp.data.ParsedResults[0].ParsedText;
      let result = 'No';

      //console.log('parsedText: ', parsedText);
      if (parsedText.match(/Bulgogi/i)) {
        result = 'OMG Yes!!!!!';
      }
      callback(null, success(result));
    }
  })
	.catch((err) => {
    console.log('ERROR: ', err);
	  callback(null, failure(err.data));
	});
}
