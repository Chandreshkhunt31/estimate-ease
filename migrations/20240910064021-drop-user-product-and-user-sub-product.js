'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This can be empty
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.dropTable('users_products');
    await queryInterface.dropTable('user_sub_products');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
