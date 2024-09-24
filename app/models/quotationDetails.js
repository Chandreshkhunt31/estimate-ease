'use strict';

module.exports = (sequelize, DataTypes) => {
  const QuotationDetail = sequelize.define('QuotationDetail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quote_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    quote_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'quotation_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true
  });

  QuotationDetail.associate = function (models) {

    QuotationDetail.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'users'
    });

    QuotationDetail.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customers'
    });
  };

  return QuotationDetail;
};
