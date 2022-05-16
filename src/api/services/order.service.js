const ApiError = require('../helpers/ApiError');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const ApiFeatures = require('../helpers/ApiFeatures');

exports.getAllOrders = async (query) => {
  try {
    const features = new ApiFeatures(
      Order.find().populate('user', {
        name: 1,
        email: 1,
        phoneNumber: 1,
      }),
      query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    return doc;
  } catch (err) {
    throw err;
  }
};

exports.createOrder = async (userId, data) => {
  try {
    const user = userId;
    const { cartItems, tax, shipping_fee, shippingAddress, paymentMethod } =
      data;

    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
      const dbProduct = await Product.findOne({ id: item.product });

      if (!dbProduct) {
        throw ApiError.notfound(
          `No product found with this id ${item.product}`
        );
      }

      const { name, price, id } = dbProduct;

      const singleOrderItem = {
        product: id,
        name,
        color: item.color,
        amount: item.amount,
        price,
      };

      orderItems = [...orderItems, singleOrderItem];
      subtotal += item.amount * price;
    }

    const total = tax + shipping_fee + subtotal;

    const order = await Order.create({
      tax,
      shipping_fee,
      subtotal,
      total,
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
    });

    return order;
  } catch (err) {
    throw err;
  }
};

exports.getOrder = async (id) => {
  try {
    const order = await Order.findById(id);

    return order;
  } catch (err) {
    throw err;
  }
};

exports.updateOrderToDelivered = async (id) => {
  try {
    let order = await Order.findById(id);

    if (!order) {
      throw ApiError.notfound(`No order found with this id ${id}`);
    }

    order.status = 'delivered';
    order.deliveredAt = Date.now();
    order = await order.save({ new: true, runValidators: true });

    return order;
  } catch (err) {
    throw err;
  }
};

exports.getCurrentUserOrders = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).sort('-createdAt');
    return orders;
  } catch (err) {
    throw err;
  }
};

exports.updateOrderToPaid = async (id, data) => {
  try {
    let order = await Order.findById(id);

    if (!order) {
      throw ApiError.notfound(`No order found with this id ${id}`);
    }

    order.status = 'paid';
    order.paidAt = Date.now();
    order.paymentResult = {
      id: data.id,
      status: data.status,
      update_time: data.update_time,
      email_address: data.email_address,
    };
    order = await order.save({ new: true, runValidators: true });

    return order;
  } catch (err) {
    throw err;
  }
};
