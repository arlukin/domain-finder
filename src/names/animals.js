const animals = [
  "Ant",
  "Bat",
  "Bird",
  "Fly",
  "Cat",
  "Cow",
  "Dog",
  "Donkey",
  "Duck",
  "Fish",
  "Fox",
  "Frog",
  "Hamster",
  "Hammer",
  "Horse",
  "Human",
  "Lion",
  "Monkey",
  "Elk",
  "Parrot",
  "Pig",
  "Puma",
  "Wolf",
  "Zebra",
  "Sea"
];

function domainList(result) {
  const newResult = [];
  result.forEach(value2 => {
    result.forEach(value1 => {
      if (value1 != value2) newResult.push(value1 + value2);
    });
  });
  return newResult;
}

const filtered = animals.filter(
  val => val.length > 1 && !val.includes(" ") && val.length < 40
);
const combined = domainList(filtered);

module.exports = animals;
