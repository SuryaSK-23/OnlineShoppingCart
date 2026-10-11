public class Product {
    private int id;
    private String name;
    private String category;
    private String subCategory;
    private float price;
    private int inStock;

    public Product(int id, String name, String category, String subCategory, float price, int inStock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.subCategory = subCategory;
        this.price = price;
        this.inStock = inStock;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getSubCategory() { return subCategory; }
    public float getPrice() { return price; }
    public int getInStock() { return inStock; }
    public void setInStock(int inStock) { this.inStock = inStock; }

    @Override
    public String toString(){
        return String.format("ID: %-2d | Name: %-22s | Sub: %-12s | Price: %-8.2f | InStock: %-3d", 
                             id, name, subCategory, price, inStock);
    }
}