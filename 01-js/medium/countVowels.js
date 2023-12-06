/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const string = str.toLowerCase();
  let count = 0;
  const vowels = "aeiou";

  for (const char of string) {
    if (vowels.indexOf(char) !== -1) {
      count++;
    }
  }
  return count;
}
module.exports = countVowels;
