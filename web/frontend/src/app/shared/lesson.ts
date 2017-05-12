import { Comment } from "./comment";

export class Lesson {
    id: number;
    title: string;
    content?: string;
    comments?: Comment[];
    createdAt: any;

    constructor(id: number, title: string,  createdAt: any, content?: string, comments?: Comment[]) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.comments = comments;
        this.createdAt = createdAt;
    }
}