'use strict';

module.exports = (sequelize, DataTypes) => {
  const UsersProduct = sequelize.define('UsersProduct', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true
  });

  UsersProduct.associate = function(models) {

    UsersProduct.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    UsersProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return UsersProduct;
};
