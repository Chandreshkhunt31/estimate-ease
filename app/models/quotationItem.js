'use strict';

module.exports = (sequelize, DataTypes) => {
  const QuotationItem = sequelize.define('QuotationItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'QuotationDetail',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
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
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'quotation_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true
  });

  QuotationItem.associate = function (models) {

    QuotationItem.belongsTo(models.QuotationDetail, {
      foreignKey: 'quote_id',
      as: 'quotations'
    });

    QuotationItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'products'
    });

    QuotationItem.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customers'
    });
  };

  return QuotationItem;
};
