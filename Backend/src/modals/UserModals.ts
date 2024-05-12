import { UserInterfaces } from "src/interfaces/UserInterfaces";

export class UserModal {
    id: string;
    roles: string[];
    name: string;
    email: string;
    phoneNumber: string;
    username?: string;

    constructor(user: UserInterfaces, username?: string) {
        this.id = user._id;
        this.roles = user.roles;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.username = username || user.username;
    }

    public static fromUsers(users: UserInterfaces[]) {
        return users.map(user => new UserModal(user));
    }
}