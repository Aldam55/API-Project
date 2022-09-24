'use strict';

// const spots = [
//   {
//     ownerId: 1,
//     address: '9619 Primrose Drive',
//     city: 'Sacramento',
//     state: 'California',
//     country: 'United States',
//     lat: 38.5816,
//     lng: 121.4944,
//     name: 'Primrose Palace',
//     description: 'This place is a palace!',
//     price: 150,
//   },
//   {
//     ownerId: 2,
//     address: '212 Wintergreen Avenue',
//     city: 'Miami',
//     state: 'Florida',
//     country: 'United States',
//     lat: 25.7617,
//     lng: 80.1918,
//     name: 'Miami Winter',
//     description: 'Take a winter vacation to snowy Miami, Florida!',
//     price: 35,
//   },
//   {
//     ownerId: 3,
//     address: '9988 Beacon St.',
//     city: 'Chicago',
//     state: 'Illinois',
//     country: 'United States',
//     lat: 41.8781,
//     lng: 87.6298,
//     name: 'Just Chicago',
//     description: 'Just a house available for booking in Chicago',
//     price: 300,
//   }, {
//     ownerId: 4,
//     address: '14 Mountainview Drive',
//     city: 'Seattle',
//     state: 'Washington',
//     country: 'United States',
//     lat: 47.6062,
//     lng: 122.3321,
//     name: 'Seattle View',
//     description: 'Beautiful view of Seattle',
//     price: 600,
//   }
// ]
// Math.floor(Math.random() * 500) + 100
//   ((Math.random() - 0.5) * 90).toFixed(4)

const addresses = ['236 Woodsman Drive', '9765 South Pleasant Avenue', '7559 Goldfield Street', '844 Warren St.', '840 Bridgeton St.', '8491 Canal Rd.', '19 State Dr.', '8136 Heritage Drive', '878 Adams Road', '8 Paris Hill Drive', '709 Wood Drive', '979 Lakeview Ave.', '84 Wilson Court', '9608 Peninsula St.', '719 Wild Horse Dr.', '8543 Lawrence Lane', '8567 2nd Court', '7680 S. Washington Dr.', '7 Lincoln St.', '46 Grand Dr.']
const cities = ['Gaborone', 'Bologna', 'Brasília', 'Kolkata', 'Edinburgh', 'Denver', 'Honolulu', 'Nuuk', 'Paris', 'Charlotte', 'Abidjan', 'Bilbao', 'Odessa', 'Rome', 'Liverpool', 'Hallstatt', 'Warsaw', 'Chișinău', 'Luxembourg', 'Phoenix']
const states = ['South Carolina', 'Minnesota', 'Virginia', 'North Carolina', 'Wyoming', 'New Hampshire', 'New Jersey', 'Tennessee', 'Utah', 'Rhode Island', 'Mississippi', 'Arizona', 'Washington', 'West Virginia', 'Idaho', 'Vermont', 'Oklahoma', 'Montana', 'North Dakota', 'Nebraska']
const countries = ['Qatar', 'Mali', 'Moldova', 'Timor-Leste', 'Austria', 'Kazakhstan', 'Cambodia', 'Finland', '	Fiji', 'Niger', 'Luxembourg', 'Vietnam', '	Ecuador', 'Bulgaria', 'Madagascar', 'Marshall Islands', 'Canada', 'South Africa', 'Nepal', 'Botswana']
const names = ['Far Water', 'Favorsham', 'Blackpool', 'Irragin', 'Berxley', 'Stanlow', 'Skargness', 'Naporia', 'Swadlincote', 'Bellmare', 'Glossop', 'Caelfall', 'Gloucester', 'Oakheart', 'Transmere', 'Caerfyrddin', 'Porthcrawl', 'Garigill', 'Onryx', 'Erostey']
const descriptions = ['A northern manor house.', 'A hospital for the long term sick overlooking the coast.', ' A cemetery alongside the river.', 'A slope of long grass dotted with wild flowers and moths in the middle of the town.', 'A small town built on a low hill.', 'A lonely spot underneath overhanging willows beside the river among the trees in a pleasantly green valley.', 'A village in the Dales.', 'A small town.', 'A large commercial building in open countryside.', 'The end house of a terrace of Victorian town houses in a small village.', 'A rocky outcrop.', 'A church.', 'A posh marina development.', ' A rural village on a trunk road in open countryside.', 'A village by a lake.', 'A gothic hunting lodge in the suburbs of the city.', 'A bridge at the head of a deep river valley.', 'A nineteen thirties semi in vast acres of landscaped country estate.', 'One of a pleasant row of cottages in a small village.', 'A service station on a major road.']

function getSpots() {
  let spots = [];
  for (let i = 0; i < 12; i++) {
    const random = Math.floor(Math.random() * 20)
    const ownerId = Math.floor(Math.random() * 12)
    const address = addresses[random]
    const city = cities[random]
    const state = states[random]
    const country = countries[random]
    const lat = Number(((Math.random() - 0.5) * 90).toFixed(3))
    const lng = Number(((Math.random() - 0.5) * 180).toFixed(3))
    const name = names[random]
    const description = descriptions[random]
    const price = Math.floor(Math.random() * 500) + 100
    spots.push({
      ownerId: ownerId,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price
    })
  }
  return spots
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
    return queryInterface.bulkInsert('Spots', getSpots())
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
