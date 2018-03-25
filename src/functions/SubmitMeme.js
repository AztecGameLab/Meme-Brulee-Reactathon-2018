import axios from "axios";

export function handler(event, context, callback) {
  axios({
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    url: "https://api.imgflip.com/caption_image?",
    data: event.body,
    body: event.body
  }).then(function(response) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  });
}
