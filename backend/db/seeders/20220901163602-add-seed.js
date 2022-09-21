'use strict';

const reviews = [
  {
    spotId: 1,
    userId: 1,
    review: "This place is poppin",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 2,
    review: "This place is poppin",
    stars: 3,
  },
  {
    spotId: 1,
    userId: 3,
    review: "This place is poppin",
    stars: 5,
  },
  {
    spotId: 1,
    userId: 4,
    review: "This place is poppin",
    stars: 2,
  },
]


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
    await queryInterface.bulkInsert("Reviews", reviews)
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
