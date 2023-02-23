package vttp2022.assessment.csf.orderbackend.repositories;

public class Queries {
    public static String SQL_INSERT_ORDER = "insert into orders(name, email, pizza_size, thick_crust, sauce, toppings, comments) values (?, ?, ?, ?, ?, ?, ?)";
    //needless to say its one ? for each item, dont be a dumbass

}

    

