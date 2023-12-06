/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const categorySpent = [];

  transactions.forEach((transaction) => {
    if (transaction.category in categorySpent) {
      categorySpent[transaction.category] += transaction.price;
    } else {
      categorySpent[transaction.category] = transaction.price;
    }
  });

  const result = Object.entries(categorySpent).map(([category, spent]) => ({
    category,
    totalSpent: spent,
  }));

  return result;
}

module.exports = calculateTotalSpentByCategory;
