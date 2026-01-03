'use strict';

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
};
