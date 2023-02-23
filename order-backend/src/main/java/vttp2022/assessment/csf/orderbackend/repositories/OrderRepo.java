package vttp2022.assessment.csf.orderbackend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;

@Repository
public class OrderRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;  //use mongotemplate and redistemplate when required

    public boolean createOrder (Order order){

         // convert the toppings list into a string seperated by commas
         String toppingsStr = String.join(",", order.getToppings());
         System.out.println(toppingsStr);
        
         return jdbcTemplate.update(Queries.SQL_INSERT_ORDER, 
             order.getName(), 
             order.getEmail(), 
             order.getSize(), 
             order.isThickCrust(), 
             order.getSauce(), 
             toppingsStr, 
             order.getComments()) > 0;
        
    }
    
}
