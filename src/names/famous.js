const firstNameList = [
  "Alex",
  "Billie",
  "David",
  "Eddie",
  "Greta",
  "James",
  "John",
  "Kevin",
  "Luke",
  "Tyler"
];

const lastNameList = [
  "Brown",
  "Charles",
  "Gordon",
  "Harper",
  "Hart",
  "Huffman",
  "Kelly",
  "Kraft",
  "Larson",
  "London",
  "Luck",
  "Malek",
  "Morgan",
  "Perry",
  "Thunberg",
  "Westbrook",
  "Williams",
  "Williamson",
  "Woods"
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
