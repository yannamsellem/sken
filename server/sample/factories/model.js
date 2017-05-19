module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Model',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      classMethods: {
        associate: (models) => {}
      }
    });

  return Model;
};
