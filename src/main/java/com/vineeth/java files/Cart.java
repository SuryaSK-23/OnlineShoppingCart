
import java.util.ArrayList;

public class Cart {
    ArrayList<Product> items;
    private float total;

    Cart(){
        this.items = new ArrayList<>();
    }

    public float calcTotalPrice(){
        float sum = 0f;
        for (Product p:items){
            sum+=p.getPrice();
        }
        return sum;
    }

    public void addItem(Product product){
        if(product.getInStock() <= 0){
            System.out.println("Item out of stock, cannot add item to cart");
            return;
        }
        
        items.add(product);
        product.setInStock(product.getInStock() - 1);
        System.out.println("Item added to cart successfully!");
    }

    public void cartItems(){
        System.out.println("---------Items added to cart---------");
        for (Product p:items){
            System.out.println(p);
        }
        total = calcTotalPrice();
        System.out.println("Total Bill: "+total);
    }

    public void clearItems(){
        items.clear();
    }
}
