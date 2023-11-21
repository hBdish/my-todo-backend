import { UserModel } from '../models/user-model.js';
import UserService from '../service/user-service.js';
import { ApiError } from '../exceptions/api-error.js';
import { validationResult } from 'express-validator';
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Неправильно введен логин или пароль', errors.array()));
            }
            const { password, email } = req.body;
            if (!password || !email) {
                throw ApiError.BadRequest('Не введен email или пароль');
            }
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { password, email } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json('succes');
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(`${process.env.CLIENT_URL}`);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const user = await UserModel.findAll();
            if (!user)
                return res.json(`users not find`);
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
export default new UserController();
//# sourceMappingURL=user-controller.js.map