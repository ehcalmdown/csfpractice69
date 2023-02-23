package vttp2022.assessment.csf.orderbackend.services;

import java.text.DecimalFormat;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepo;


@Service
public class OrderService {

	@Autowired
	private PricingService priceSvc;

	@Autowired
	private OrderRepo orderRepo;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public void createOrder(Order order) {
		orderRepo.createOrder(order);
	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {

		// for float rounding
		DecimalFormat df = new DecimalFormat("0.00");

		// call the repo and pass in the email, returns a list of order
		List<Order> orders = orderRepo.getOrdersByEmail(email);

		// declare a list of order summary to hold the final data
		List<OrderSummary> orderSummaries = new LinkedList<>();

		// loop through the list of order to calculate the price of each order
		for (int i = 0; i < orders.size(); i++) {

			// declare a total variable to calcualte total amount
			float total = 0f;
			float priceOfSize = 0f;
			float priceOfSauce = 0f;
			float priceOfToppings = 0f;
			float priceOfCrust = 0f;

			// calculate the price of each component
			priceOfSize = priceSvc.size(orders.get(i).getSize());
			priceOfSauce = priceSvc.sauce(orders.get(i).getSauce());

			for (int j = 0; j < orders.get(i).getToppings().size(); j++) {
				priceOfToppings += priceSvc.topping(orders.get(i).getToppings().get(j));
			}

			if (orders.get(i).isThickCrust()) {
				priceOfCrust = priceSvc.thickCrust();
			} else {
				priceOfCrust = priceSvc.thinCrust();
			}

			// tabulate the total price for an order
			total = Float.parseFloat(df.format(priceOfSize + priceOfSauce + priceOfToppings + priceOfCrust));

			// build the order summary model
			OrderSummary orderSummary = new OrderSummary();
			orderSummary.setOrderId(orders.get(i).getOrderId());
			orderSummary.setName(orders.get(i).getName());
			orderSummary.setEmail(orders.get(i).getEmail());
			orderSummary.setAmount(total);

			// push it into the list of order summary
			orderSummaries.add(orderSummary);
		}

		return orderSummaries;
	}
}
