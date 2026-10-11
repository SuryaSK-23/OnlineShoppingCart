import java.util.ArrayList;
import java.util.Scanner;

public class Shop {
    ArrayList<Product> availableItems = new ArrayList<>();
    Cart c = new Cart();
    User user;

    Shop(User user){
        this.user = user;
        // Clothes
        availableItems.add(new Product(1, "Formal Shirt", "Clothes", "Shirt", 899, 10));
        availableItems.add(new Product(2, "Graphic T-shirt", "Clothes", "T-shirt", 499, 10));
        availableItems.add(new Product(3, "Denim Pants", "Clothes", "Pant", 999, 5));
        availableItems.add(new Product(4, "Suit Blazer", "Clothes", "Formal", 2499, 4));

        // Foods
        availableItems.add(new Product(5, "Fresh Apples", "Foods", "Fruits", 199, 15));
        availableItems.add(new Product(6, "Organic Carrots", "Foods", "Vegetables", 90, 20));
        availableItems.add(new Product(7, "Canned Beans", "Foods", "Canned Food", 150, 12));
        availableItems.add(new Product(8, "Rasgulla Box", "Foods", "Sweets", 350, 8));

        // Electronics
        availableItems.add(new Product(9, "Lenovo IdeaPad", "Electronics", "Laptop", 60000, 5));
        availableItems.add(new Product(10, "iPhone 15", "Electronics", "Phones", 79999, 7));
        availableItems.add(new Product(11, "Boat Earbuds", "Electronics", "Ear-buds", 999, 15));
        availableItems.add(new Product(12, "Sony Headphones", "Electronics", "Headphones", 2999, 6));

        // Stationary
        availableItems.add(new Product(13, "Ballpoint Pen", "Stationery", "Pen", 20, 50));
        availableItems.add(new Product(14, "Java Programming Book", "Stationery", "Books", 450, 10));
        availableItems.add(new Product(15, "Graphite Pencil", "Stationery", "Pencil", 10, 40));
        availableItems.add(new Product(16, "Watercolour Set", "Stationery", "Colours", 250, 12));
    }

    public Product searchProductById(int id){
        for (Product p : availableItems){
            if (p.getId() == id){
                return p;
            }
        }
        return null;
    }

    // Interactive Category Browser Menu
    public void browseCategories(Scanner sc){
        int catChoice = 0;
        while(catChoice != 5){
            System.out.println("\n--- Browse Products by Category ---");
            System.out.println("1. Clothes");
            System.out.println("2. Foods");
            System.out.println("3. Electronics");
            System.out.println("4. Stationary");
            System.out.println("5. Back to Main Menu");
            System.out.print("Select a category: ");
            catChoice = sc.nextInt();

            String selectedCategory = "";
            switch(catChoice){
                case 1: selectedCategory = "Clothes"; break;
                case 2: selectedCategory = "Foods"; break;
                case 3: selectedCategory = "Electronics"; break;
                case 4: selectedCategory = "Stationery"; break;
                case 5: return;
                default:
                    System.out.println("Invalid category choice.");
                    continue;
            }

            // Display products matching the selected category
            System.out.println("\n--- " + selectedCategory + " ---");
            boolean found = false;
            for (Product p : availableItems){
                if (p.getCategory().equalsIgnoreCase(selectedCategory)){
                    System.out.println(p);
                    System.out.println();
                    found = true;
                }
            }
            if (!found) {
                System.out.println("No items available in this category.");
            }
        }
    }

    public void displayCart(){
        c.cartItems();
    }

    public void addToCart(int id){
        Product item = searchProductById(id);
        if (item == null){
            System.out.println("Product not found");
            return;
        }
        c.addItem(item);
    }

    public void checkout(Scanner sc){
        float total;
        System.out.println("Ready to complete your order? Review your items below and proceed to payment.");
        displayCart();
        System.out.print("Proceed to payment?(y/n): ");
        char choice = sc.next().toLowerCase().charAt(0);
        if (choice == 'y'){
            total = c.calcTotalPrice();
            if (user.getBalance() < total){
                System.out.println("Not enough Balance");
            } else {
                user.setBalance(user.getBalance() - total);
                System.out.println("Payment successful! Remaining balance: ₹" + user.getBalance());
                c.clearItems();
            }
        }
    }
    public void displayProducts(){
        System.out.println("------Available Products--------");
        for (Product p : availableItems){
            System.out.println(p);
            System.out.println();
        }
    }
}