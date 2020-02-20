const firstNameList = [
  "Brad",
  "Adam",
  "Alan",
  "Albert",
  "Alex",
  "Billie",
  "Billy",
  "Bobby",
  "Brandon",
  "Brian",
  "Carl",
  "David",
  "Donald",
  "Dylan",
  "Eddie",
  "Eric",
  "Frank",
  "Gary",
  "Greta",
  "Henry",
  "Jack",
  "Jacob",
  "James",
  "Jason",
  "Jerry",
  "Joe",
  "John",
  "Kevin",
  "Kyle",
  "Logan",
  "Luke",
  "Mark",
  "Ragnar",
  "Roy",
  "Ryan",
  "Samuel",
  "Scott",
  "Toni",
  "Tony",
  "Tyler",
  "Walter",
  "Wayne",
  "William",
  "Willie"
];

const lastNameList = [
  "Baker",
  "Baxter",
  "Blake",
  "Bolton",
  "Burke",
  "Conan",
  "Dallas",
  "Gordon",
  "Harper",
  "Harper",
  "Holland",
  "King",
  "Lane",
  "Lee",
  "Logan",
  "Morgan",
  "Paris",
  "Paxton",
  "Piper",
  "Vega",
  "Ash",
  "Brown",
  "Goodwin",
  "Gordon",
  "Hugo",
  "Kaiser",
  "Smith"
];

function firstAndLastNameList() {
  const newResult = [];
  firstNameList.forEach(firstName => {
    lastNameList.forEach(lastName => {
      newResult.push(firstName + lastName);
    });
  });
  return newResult;
}
module.exports = firstAndLastNameList();
