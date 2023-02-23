package vttp2022.assessment.csf.orderbackend.controllers;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
@RequestMapping(path = "/api")
public class OrderRestController {

    @Autowired
    private OrderService orderSvc;

    @PostMapping(value = "/order", produces=MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        
        // check if the request body param has been successfully received by springboot
        System.out.printf(">>> request body params received: name=%s\n", order.getName());
        System.out.printf(">>> request body params received: email=%s\n", order.getEmail());
        System.out.printf(">>> request body params received: size=%s\n", order.getSize());
        System.out.printf(">>> request body params received: sauce=%s\n", order.getSauce());
        System.out.printf(">>> request body params received: thickCrust=%s\n", order.isThickCrust());
        System.out.printf(">>> request body params received: toppings=%s\n", order.getToppings().toString());
        System.out.printf(">>> request body params received: comments=%s\n", order.getComments());

        // call the service and pass in the order
        this.orderSvc.createOrder(order);

        return ResponseEntity.status(HttpStatus.OK).body(null);

    }

    @GetMapping(value = "/order/{email}/all", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getOrders(@PathVariable String email) {
        
        // check if the path variable param has been successfully received by springboot
        System.out.printf(">>> path variable params received: email=%s\n", email);

        // *** need to use the opt get and return whether there is a result
        // call the service and pass in the email
        // returns a list of order summary
        List<OrderSummary> orderSummaries = new LinkedList<>();
        orderSummaries = this.orderSvc.getOrdersByEmail(email);

        // convert list of order summary into a json array to pass back to frontend
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        orderSummaries.stream()
            .forEach(o -> {
                arrBuilder.add(o.toJson());
            });
        
        JsonArray jsonArrayOrderSummaries = arrBuilder.build();
            
        return ResponseEntity.ok(jsonArrayOrderSummaries.toString());
    }

}
