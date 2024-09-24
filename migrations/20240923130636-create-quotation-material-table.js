'use strict';

/** @type {import('sequelize-cli').Migration} */
 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materials', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unit_of_measure: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false,
      }, 
      quot_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quotation_items',  
          key: 'id',
        } 
      }, 
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',  
          key: 'id',
        } 
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('materials');
  },
};


// quotation_number: A unique identifier for the customer's quotation.

// representative_name: The name of the merchant’s representative handling the customer.

// date: The date when the quotation was created.

// merchant_user_id: The ID of the associated merchant.