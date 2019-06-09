export default class Product {
    public id: number;
    public title: string;

    public static byId(): Product {
        let product = new Product();
        product.id = 1;
        product.title = 'T';
        return product;
    }
}
