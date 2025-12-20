import Cart from "../models/cartModel";
import Book from "../models/bookModel";



// ADD TO CART //

export const addToCart = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        message: "userId and bookId required",
        error:error.message,
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    let cart = await Cart.findOne({ User: userId });

    if (!cart) {
      cart = new Cart({
        User: userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        book: bookId,
        quantity: quantity || 1,
        price: book.price,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Book added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Add to cart failed",
      error: error.message,
    });
  }
};



// GET USER CART//


export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ User: userId })
      .populate("items.book");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      message: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch cart failed",
      error: error.message,
    });
  }
};



// UPDATE CART ITEM//

export const updateCart = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    const cart = await Cart.findOne({ User: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: cart,
    });
  } catch (error) {
    res.status(400).json({
      message: "Update cart failed",
      error: error.message,
    });
  }
};



// REMOVE ITEM FROM CART //

export const removeFromCart = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const cart = await Cart.findOne({ User: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.book.toString() !== bookId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Remove item failed",
      error: error.message,
    });
  }
};



// CLEAR CART //

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { User: userId },
      { items: [] },
      { new: true }
    );

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Clear cart failed",
      error: error.message,
    });
  }
};
