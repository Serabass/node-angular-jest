export default class Product {
    public id: number;
    public title: string;

    public static byId(src: any, args: any, context: any): Product {
        let product = new Product();
        product.id = args.id;
        product.title = 'T';
        return product;
    }
}
