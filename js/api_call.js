// documentation of the api
// https://docs.corona.lmao-xd.wtf/
const api_call = (endpoint, callback) => {
  //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://corona.lmao.ninja/v3/covid-19/" + endpoint;

  let data = false;
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(JSON.parse(xmlhttp.responseText));
    } else {
      data = "error";
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

//test
// api_call(function(response) {
//     console.log(response);
// });
// response:
// { cases: 803541,
//     deaths: 39044,
//     recovered: 172438,
//     updated: 1585662307520,
//     active: 592059
// }
