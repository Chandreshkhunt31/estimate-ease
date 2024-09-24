'use strict';

module.exports = (sequelize, DataTypes) => {
  const QuotationImage = sequelize.define('QuotationImage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quot_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'QuotationItem',
        key: 'id'
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'quotation_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    underscored: true
  });

  QuotationImage.associate = function (models) {

    QuotationImage.belongsTo(models.QuotationItem, {
      foreignKey: 'quot_item_id',
      as: 'quotation_items'
    });
  };

  return QuotationImage;
};
