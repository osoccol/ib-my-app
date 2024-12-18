export class Comment {
    _id: string = '';
    email: string = '';
    name: string = '';
    text: string = '';
    date: Date = new Date();

    constructor(name: string, email: string, text: string, date: Date) {
        this.name = name;
        this.email = email;
        this.text = text;
        this.date = date;
    }
}