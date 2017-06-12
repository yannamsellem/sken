module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      classMethods: {
        associate: (models) => {},
      },
    })

  return Model
}
