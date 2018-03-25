import axios from "axios";

export function handler(event, context, callback) {
  console.log("DATA: ", event.body, "\n");
  axios({
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    url: "https://api.imgflip.com/caption_image?",
    data: event.body,
    body: event.body
  }).then(function(response) {
    console.log(response);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  });
}
