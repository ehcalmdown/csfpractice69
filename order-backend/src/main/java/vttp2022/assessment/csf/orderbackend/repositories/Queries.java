package vttp2022.assessment.csf.orderbackend.repositories;

public class Queries {
    
    public static String SQL_INSERT_ORDER = "insert into orders(name, email, pizza_size, thick_crust, sauce, toppings, comments) values (?, ?, ?, ?, ?, ?, ?)";
    public static String SQL_SELECT_ORDER_BY_EMAIL = "select * from orders where email = ?";

}

    

