'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the old constraint if it exists
    try {
      await queryInterface.removeConstraint('sub_products_units', 'sub_products_units_sub1_product_id_fkey');
    } catch (error) {
      console.log('Constraint does not exist, skipping removal.');
    }

    // Change the column definition
    await queryInterface.changeColumn('sub_products_units', 'sub_product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'merchant_sub_products', // New reference model
        key: 'id',
      },
    });

    // Add the new foreign key constraint
    await queryInterface.addConstraint('sub_products_units', {
      fields: ['sub_product_id'],
      type: 'foreign key',
      name: 'sub_product_id', // New constraint name
      references: {
        table: 'merchant_sub_products', // New reference model
        field: 'id',
      },
      onDelete: 'CASCADE', // Adjust as needed
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the new constraint if it exists
    try {
      await queryInterface.removeConstraint('sub_products_units', 'sub_products_units_sub_product_id_fkey');
    } catch (error) {
      console.log('Constraint does not exist, skipping removal.');
    }

    // Revert the column definition to the old state
    await queryInterface.changeColumn('sub_products_units', 'sub_product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_sub_products', // Original reference model
        key: 'id',
      },
    });

    // Optionally, re-add the old foreign key constraint
    await queryInterface.addConstraint('sub_products_units', {
      fields: ['sub_product_id'],
      type: 'foreign key',
      name: 'sub_products_units_sub_product_id_fkey', // Original constraint name
      references: {
        table: 'user_sub_products', // Original reference model
        field: 'id',
      },
      onDelete: 'CASCADE', // Adjust as needed
    });
  }
};
