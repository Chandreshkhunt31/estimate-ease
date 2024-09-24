'use strict';

module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_of_measure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quote_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'QuotationItem',
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'id'
      }
    }
  }, {
    tableName: 'materials',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });

  Material.associate = function (models) {
    Material.belongsTo(models.QuotationItem, {
      foreignKey: 'quote_item_id',
      as: 'quotation_items'
    });

    Material.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customers'
    });
  };

  return Material;
};
