import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
const TokenModel = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    refreshToken: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
});
export { TokenModel };
//# sourceMappingURL=token-model.js.map