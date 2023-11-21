class UserDto {
    id;
    email;
    isActivated;
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}
export { UserDto };
//# sourceMappingURL=user-dto.js.map