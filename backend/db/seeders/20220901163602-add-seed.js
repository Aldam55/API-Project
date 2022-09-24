'use strict';

// const reviews = [
//   {
//     spotId: 1,
//     userId: 1,
//     review: "This place is poppin",
//     stars: 4,
//   },
//   {
//     spotId: 1,
//     userId: 2,
//     review: "This place is poppin",
//     stars: 3,
//   },
//   {
//     spotId: 1,
//     userId: 3,
//     review: "This place is poppin",
//     stars: 5,
//   },
//   {
//     spotId: 1,
//     userId: 4,
//     review: "This place is poppin",
//     stars: 2,
//   },
// ]
const descriptions = [
  'I was amazed at the quality of This location. Needless to say we are extremely satisfied with the results.',
  'Keep up the excellent work. I use This location often. Absolutely wonderful!',
  'Dude, your stuff is the bomb!',
  'I love This location. I wish I would have thought of it first. This location should be nominated for service of the year.',
  'Your company is truly upstanding and is behind its product 100%.',
  'I will recommend you to my colleagues. Keep up the excellent work. I love This location.',
  'This location was the best investment I ever made.',
  'You guys rock!',
  'I would like to personally thank you for your outstanding product'
]

function getReviews() {
  let reviews = []
  for (let i = 0; i < 15; i++) {
    const spotId = Math.floor(Math.random() * 12) + 1
    const userId = Math.floor(Math.random() * 10) + 13
    const review = descriptions[Math.floor(Math.random() * 9)]
    const stars = Math.floor(Math.random() * 5) + 1
    reviews.push({
      spotId,
      userId,
      review,
      stars
    })
  }
  return reviews
}


module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Reviews", getReviews())
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews")
  }
};
