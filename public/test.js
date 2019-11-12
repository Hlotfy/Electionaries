var url='https://content.guardianapis.com/world/2019/nov/12/israel-kills-islamic-jihad-commander-in-gaza-sparking-reprisal-rocket-attacks?show-fields=body&api-key=29ba8134-82bf-40a9-8980-fbc3bde4516b';
const request = require('request');
var myJSON = require("JSON");
var article;

var jsonResult;

const options = {
    url: url,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

// article = request(options, function(err, res, body) { 
//     let json = JSON.parse(body);
//     // console.log(json);
//     return json['fields'];
// });

function parseHTML(url, callback) {
    // var text = body["response"]; //["content"]["fields"]["body"];
    var response;
    request({
        url: url,
        method: 'GET',
        json: true
      }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
          return callback(error || {statusCode: response.statusCode});
        }
        return callback(null, body);  
      });
    console.log(response);
    return response;
}

article = parseHTML(url, function(err, body) {
    if (err) {
        console.log(err);
      } else {
        var html = body['response']['content']['fields']['body']; 
        console.log(stripHtml(html));
        return body['response']['content']['fields']['body']; //['content']['fields'];
      }
});

console.log(article);

function stripHtml(html){
    // Create a new div element
    var parsed = html.replace(/<[^>]+>/g, '').split('\n');
    return parsed;
}



//Hello World
//It's me, Mario

// article = request.get(url); //function (error, response, body) {
// //   console.error('error:', error); // Print the error if one occurred
// //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
//   return parseHTML(body);
// });

