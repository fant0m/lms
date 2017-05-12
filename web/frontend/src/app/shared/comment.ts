import { User } from "../users/shared/user";

export class Comment {
    id: number;
    text: string;
    user: User;

    constructor(id: number, text: string, user: User) {
        this.id = id;
        this.text = text;
        this.user = user;
    }
}