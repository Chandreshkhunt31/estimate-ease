'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    business_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'businessCategories',
        key: 'id'
      }
    }
  }, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });

  Product.associate = function(models) {
    Product.belongsTo(models.BusinessCategory, {
      foreignKey: 'business_category_id',
      as: 'businessCategory'
    });

    Product.hasMany(models.MerchantProduct, {
      foreignKey: 'product_id',
      as: 'merchant_products',
    });
  };

  return Product;
};
