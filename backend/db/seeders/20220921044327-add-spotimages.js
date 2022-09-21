'use strict';

// const spotImage = [
//   {
//     spotId: 1,
//     url: 'https://www.nps.gov/articles/images/image1_3.jpeg?maxwidth=1200&autorotate=false',
//     preview: true
//   }
// ]

function getSpotImages() {
  let spotImages = []
  for (let i = 1; i <= 20; i++) {
    let spotId = i
    spotImages.push({
      spotId,
      url: 'https://www.nps.gov/articles/images/image1_3.jpeg?maxwidth=1200&autorotate=false',
      preview: true
    })
  }
  return spotImages
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
    await queryInterface.bulkInsert('SpotImages', getSpotImages())
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SpotImages")
  }
};
