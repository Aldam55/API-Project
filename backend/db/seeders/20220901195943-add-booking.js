'use strict';

const bookings = [
  {
    spotId: 4,
    userId: 1,
    startDate: "2025-12-24",
    endDate: "2025-12-25",
  },
  {
    spotId: 4,
    userId: 2,
    startDate: "2026-12-24",
    endDate: "2026-12-25",
  },
  {
    spotId: 4,
    userId: 3,
    startDate: "2027-12-24",
    endDate: "2027-12-25",
  },
  {
    spotId: 4,
    userId: 1,
    startDate: "2028-12-24",
    endDate: "2028-12-25",
  }
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
    await queryInterface.bulkInsert("Bookings", bookings)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Bookings")
  }
};
