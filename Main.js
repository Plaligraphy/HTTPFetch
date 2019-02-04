const si = require('systeminformation');
const http = require('http');
const eip = require('externalip');
const rls = require('readline-sync');
var parse, userIP, cpuName, hasbatt, osdist, osplat, fip, sip, uname, memtotal;

uname = rls.question("Username for this PC?: ");
//Grabs network interface data
si.networkInterfaces(function(data) {
  fip = data[0].ip4;
  sip = data[1].ip4;
});

si.mem(function(data) {
  var unparseMem = data.total
  memtotal = unparseMem / 1000000;
});
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

//Creating viewable web page through user's Internal IP (localhost)
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>System Information for: "+ uname +"</h1>");
  res.write("<h3>IP: </h3>" + userIP + "<br />");
  res.write("<h3>CPU: </h3>" + cpuName + "<br />");
  res.write("<h3>RAM: </h3>" + memtotal + " mb" + "<br />");
  res.write("<h3>Has Battery: </h3>" + hasbatt + "<br />");
  res.write("<h3>OS Info: </h3>" + "Platform: " + osplat + "<br />" + "Distro: " + osdist + "<br />"); 
  res.write("<h3>Network Interfaces </h3>" + "IPV4 (1): " + fip + "<br />" + "IPV4 (2): " + sip);
  res.end();
}).listen(8080);

