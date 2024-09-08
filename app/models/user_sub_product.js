'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserSubProduct = sequelize.define('UserSubProduct', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users_products',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
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
    tableName: 'user_sub_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true
  });

  UserSubProduct.associate = function(models) {
   
    UserSubProduct.belongsTo(models.UsersProduct, {
      foreignKey: 'user_product_id',
      as: 'userProduct'
    });

    UserSubProduct.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return UserSubProduct;
};
