const si = require('systeminformation');
const http = require('http');
const eip = require('externalip');

var parse, userIP, cpuName, hasbatt, osdist, osplat;

//CPU brand fetching using package
si.cpu(function(data) {
   cpuName = data.brand;
});

//Battery fetch
si.battery(function(data) {
   hasbatt = data.hasbattery;
});

//OS Info fetch
si.osInfo(function(data){
  osplat = data.platform;
  osdist = data.distro;
});

//IP info fetching using the externalip
eip(function(err, ip) {
  userIP = ip;
});

//Creating the hosting server
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>IP: </h1>" + userIP + "<br />");
  res.write("<h1>CPU: </h1>" + cpuName + "<br />");
  res.write("<h1>Has Battery: </h1>" + hasbatt + "<br />");
  res.write("<h1>OS Info: </h1>" + "Platform: " + osplat + "<br />" + "Distro: " + osdist + "<br />");
  res.end();
}).listen(8080);

