const https = require('https');
const u = require('url');

console.log('started');

var options = {
	"hostname": "westus.api.cognitive.microsoft.com",
	"port": 443,
	"path": "/text/analytics/v2.0/sentiment",
	"method": "POST",
	"headers": {
		"Ocp-Apim-Subscription-Key": "a52b04b5248547b5b246c28a043bb0ee",
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
};

var body = {
	"documents": [
		{
			"language": "en",
            "id": "1",
            "text": "Hi, how are you?"
		}
	]
}

var accumulator = '';

var req = https.request(options, function (res) {
	res.on('data', function (data) {
        accumulator = accumulator + data.toString();
        res.resume();
    });

    res.on('end', function() {
    	var fullData = JSON.parse(accumulator);
    	console.log(fullData);
    	console.log(fullData.documents);
    });
});
req.write(JSON.stringify(body));
req.end();

