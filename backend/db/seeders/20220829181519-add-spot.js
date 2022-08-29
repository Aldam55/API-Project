'use strict';

const spots = [
  {
    // ownerId: 1,
    address: '9619 Primrose Drive',
    city: 'Sacramento',
    state: 'California',
    country: 'United States',
    lat: 38.5816,
    lng: 121.4944,
    name: 'Primrose Palace',
    description: 'This place is a palace!',
    price: 150,
  },
  {
    // ownerId: 2,
    address: '212 Wintergreen Avenue',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    lat: 25.7617,
    lng: 80.1918,
    name: 'Miami Winter',
    description: 'Take a winter vacation to snowy Miami, Florida!',
    price: 35,
  },
  {
    // ownerId: 3,
    address: '9988 Beacon St.',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States',
    lat: 41.8781,
    lng: 87.6298,
    name: 'Just Chicago',
    description: 'Just a house available for booking in Chicago',
    price: 300,
  }, {
    // ownerId: 4,
    address: '14 Mountainview Drive',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
    lat: 47.6062,
    lng: 122.3321,
    name: 'Seattle View',
    description: 'Beautiful view of Seattle',
    price: 600,
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
    return queryInterface.bulkInsert('Spots', spots)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Spots')
  }
};
