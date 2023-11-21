import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/relationships-model.js';
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({
            where: { UserId: userId },
        });
        if (!!tokenData) {
            await TokenModel.update({
                refreshToken,
            }, {
                where: {
                    UserId: userId,
                },
            });
            return tokenData;
        }
        const token = await TokenModel.create({
            UserId: userId,
            refreshToken,
        });
        return token;
    }
    async removeToken(refreshToken) {
        const token = await TokenModel.destroy({
            where: {
                refreshToken,
            },
        });
        return token;
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({
            where: {
                refreshToken,
            },
        });
        return tokenData;
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
}
export default new TokenService();
//# sourceMappingURL=token-service.js.map