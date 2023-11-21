import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activationLink: {
        type: DataTypes.STRING,
    },
});
export { UserModel };
//# sourceMappingURL=user-model.js.map