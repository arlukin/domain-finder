const dns = require("dns");
var whois = require("whois");
const fs = require("fs");

const outputFolder = "data/";

const animalList = require("./names/animals");
const famousList = require("./names/famous");
const firstNameList = require("./names/firstNames");
const lastNameList = require("./names/lastNames");
const metalList = require("./names/metals");
const nickList = require("./names/nicks");
const selectedList = require("./names/selectedNames");

const prefix = []; //["", "bad", "happy", "hungry", "ultra", "hyper", "inter", "up"];
const suffix = [
  "ly",
  "io",
  "s",
  "er",
  "ers",
  "ton",
  "ness",
  "age",
  "dom",
  "hood",
  "ry",
  "ship",
  "full",
  "wise",
  "joy"
];
//process.stdout.write(JSON.stringify(animalList));
//process.exit();

function domainList(result) {
  const newResult = [];
  result.forEach(resValue => {
    prefix.forEach(prefixValue => {
      newResult.push(prefixValue + resValue);
    });
    suffix.forEach(suffixValue => {
      newResult.push(resValue + suffixValue);
    });
  });
  return newResult;
}

function hostnameExists(hostname) {
  return new Promise(resolve => {
    dns.resolveNs(hostname, nsError => {
      const hasNsServer = !nsError;
      process.stdout.write(".");
      resolve({
        hostname,
        ns: hasNsServer,
        whois: null
      });
    });
  });
}

function hostnameExistsWhois(hostname) {
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

function checkHosts(filePrefix, listOfNames) {
  const listOfDomains = listOfNames.map(x => x.toLowerCase() + ".com");
  process.stdout.write("Check DNS\n");
  Promise.all(listOfDomains.map(hostnameExists)).then(listOfStatuses => {
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

function firstAndLastNameList() {
  const newResult = [];
  firstNameList.forEach(firstName => {
    lastNameList.forEach(lastName => {
      newResult.push(firstName + lastName);
    });
  });
  return newResult;
}

//checkHosts("domains-names", domainList(nameList));
//checkHosts("animals", domainList(animalList));
//checkHosts("metal", metalList);
//checkHosts("nicks", nickList);
//checkHosts("firstLastName", firstAndLastNameList());
//checkHosts("famous", famousList);
checkHosts("selected", selectedList);

