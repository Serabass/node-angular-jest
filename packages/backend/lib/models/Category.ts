export default class Category {
    public id: number;
    public title: string;
    public parent: Category;

    public static byId(): Category {
        let category = new Category();
        category.id = 1;
        category.title = 'T';
        return category;
    }
}
