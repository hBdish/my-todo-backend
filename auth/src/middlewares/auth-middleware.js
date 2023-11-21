import { ApiError } from '../exceptions/api-error.js';
import tokenService from '../service/token-service.js';
export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.headers.user = JSON.stringify(userData);
        next();
    }
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}
//# sourceMappingURL=auth-middleware.js.map