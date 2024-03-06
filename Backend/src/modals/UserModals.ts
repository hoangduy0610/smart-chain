import { UserInterfaces } from "src/interfaces/UserInterfaces";

export class UserModal {
    id: string;
    roles: string[];
    name: string;
    phoneNumber: string;

    constructor(user: UserInterfaces) {
        this.id = user._id;
        this.roles = user.roles;
        this.name = user.name;
        this.phoneNumber = user.phoneNumber;
    }

    public static fromUsers(users: UserInterfaces[]) {
        return users.map(user => new UserModal(user));
    }
}