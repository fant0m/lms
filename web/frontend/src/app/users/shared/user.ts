export class User {
    email: string;
    username: string;
    roles: string[];

    constructor(email: string, username: string, roles: string[]) {
        this.email = email;
        this.username = username;
        this.roles = roles;
    }
}
