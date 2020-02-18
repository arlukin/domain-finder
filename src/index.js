const dns = require("dns");
var whois = require("whois");
const fs = require("fs");

const outputFolder = "data/";

const nameList = require("./names/person-names");
const animalList = require("./names/animals");
const prefix = ["", "red", "blue", "yellow", "4"];
const suffix = ["", "ly", "io", "s", "er", "ers", "ton"];
process.stdout.write(JSON.stringify(animalList));
process.exit();

function domainList(result) {
  const newResult = [];
  result.forEach(resValue => {
    prefix.forEach(prefixValue => {
      suffix.forEach(suffixValue => {
        newResult.push(prefixValue + resValue + suffixValue);
      });
    });
  });
  return newResult.map(x => x + ".com"); // .slice(0, 10);
}

function hostnameExists(hostname) {
  return new Promise(resolve => {
    dns.resolveNs(hostname, nsError => {
      const hasNsServer = !nsError;
      whois.lookup(hostname, function(err, data) {
        let whoisInfoExist = null;
        process.stdout.write(".");
        // Only check whois if no NS-server is configured.
        if (!hasNsServer)
          whoisInfoExist =
            data == undefined ? false : !data.includes("No match for domain");
        resolve({
          hostname,
          ns: hasNsServer,
          whois: whoisInfoExist
        });
      });
    });
  });
}

function checkHosts(filePrefix, listOfHostnames) {
  process.stdout.write("Check DNS\n");
  Promise.all(listOfHostnames.map(hostnameExists)).then(listOfStatuses => {
    const unFilteredFileName = outputFolder + filePrefix + ".json";
    process.stdout.write(`\nWrite to file ${unFilteredFileName}\n`);
    fs.writeFileSync(unFilteredFileName, JSON.stringify(listOfStatuses));

    process.stdout.write("Filtered\n");
    const filteredList = listOfStatuses.filter(x => x["ns"] == false);

    const filteredFileName = outputFolder + filePrefix + "-filtered.json";
    process.stdout.write(`Write ${filteredFileName}\n`);
    const sorted = filteredList; //.sort((a, b) => (a.whois > b.whois ? 1 : -1));
    fs.writeFileSync(filteredFileName, JSON.stringify(sorted));
  });
}

//checkHosts("domains-names-", domainList(nameList));
checkHosts("test-domains-animals-", domainList(animalList).slice(0, 10));
