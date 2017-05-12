import { User } from "../users/shared/user";
import { Lesson } from "./lesson";

export class Course {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    admin?: User;
    lessons?: Lesson[];

    constructor(
        id: number,
        name: string,
        slug: string,
        description: string,
        price: number,
        image: string,
        admin?: User,
        lessons?: Lesson[]
    ) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.image = image;
        this.admin = admin;
        this.lessons = lessons;
    }
}
