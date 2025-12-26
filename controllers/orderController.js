import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Book from "../models/bookModel.js";



// ============================
// CREATE ORDER
// POST /api/orders
// ============================
export const createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod = "COD" } = req.body;

    if (!userId || !shippingAddress) {
      return res.status(400).json({
        message: "userId and shippingAddress required",
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ User: userId }).populate("items.book");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate totalAmount
    let totalAmount = 0;
    const orderItems = cart.items.map((item) => {
      totalAmount += item.price * item.quantity;
      return {
        book: item.book._id,
        quantity: item.quantity,
        price: item.price,
      };
    });

    // Create order
    const order = new Order({
      user: userId,
      orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
      orderStatus: "placed",
    });

    await order.save();

    // Reduce stock of books
    for (let item of cart.items) {
      const book = await Book.findById(item.book._id);
      if (book) {
        book.stock -= item.quantity;
        await book.save();
      }
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};



// ============================
// GET USER ORDERS
// GET /api/orders/:userId
// ============================
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).populate("orderItems.book");

    res.status(200).json({
      message: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
};



// ============================
// GET SINGLE ORDER
// GET /api/orders/single/:orderId
// ============================
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("orderItems.book");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get order",
      error: error.message,
    });
  }
};



// ============================
// UPDATE ORDER STATUS
// PUT /api/orders/:orderId
// ============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};



// ============================
// DELETE ORDER
// DELETE /api/orders/:orderId
// ============================
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
