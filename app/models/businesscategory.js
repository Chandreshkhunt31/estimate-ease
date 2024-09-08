'use strict';

module.exports = (sequelize, DataTypes) => {
  const BusinessCategory = sequelize.define('BusinessCategory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'business_categories',
    timestamps: false,
    underscored: true
  });

  return BusinessCategory;
};
