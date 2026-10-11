import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String name;
        float balance;
        int choice=-1,id;
        Scanner sc = new Scanner(System.in);

        System.out.println("---------------Welcome to Online Shopping System---------------");
        System.out.print("Enter your name: ");
        name = sc.next();

        System.out.print("Enter your balance amount: ");
        balance = sc.nextFloat();

        User u = new User(name,balance);
        Shop s = new Shop(u);

        while(choice!=5){
            System.out.println("Hello "+u.getName()+"| Balance: "+u.getBalance());

            System.out.println("1. Browse Products");
            System.out.println("2. View Cart");
            System.out.println("3. Add Product to Cart");
            System.out.println("4. Checkout");
            System.out.println("5. Exit");
            System.out.print("Choose an option: ");
            choice = sc.nextInt();

            switch (choice){
                case 1:
                    s.browseCategories(sc);
                    break;
                case 2:
                    s.displayCart();;
                    break;
                case 3:
                    s.displayProducts();
                    System.out.println("Enter id of the product to add to cart: ");
                    id = sc.nextInt();
                    s.addToCart(id);
                    break;
                case 4:
                    s.checkout(sc);
                    break;
                case 5:
                    System.out.println("Thanks for visiting our shop, come again......");
                    break;
                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}
