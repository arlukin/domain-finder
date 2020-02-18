const prefix = [
  "",
  "silver",
  "ceder",
  "lager",
  "houseof",
  "velvet",
  "happy",
  "maple",
  "oak",
  "limetree",
  "sea",
  "happy",
  "hungry",
  "ultra",
  "hyper",
  "inter",
  "up"
];
const suffix = [
  "",
  "cows",
  "cats",
  "sons",
  "ton",
  "joy",
  "market",
  "s",
  "sley",
  "maple",
  "oak",
  "limetree",
  "bird",
  "fox",
  "lion"
];

function domainList(result) {
  const newResult = [];
  prefix.forEach(prefixValue => {
    suffix.forEach(suffixValue => {
      newResult.push(prefixValue + suffixValue);
    });
  });
  return newResult;
}

module.exports = domainList().map(x => x + ".com");
