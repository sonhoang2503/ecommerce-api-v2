const ApiError = require('../helpers/ApiError');
const Discount = require('../models/discount.model');
const { generateDiscountCode } = require('../helpers/generateCode');
const ApiFeatures = require('../helpers/ApiFeatures');

exports.createDiscount = async (data) => {
  try {
    const code = generateDiscountCode();
    data.code = code[0];
    data.expiresDate = Date.now() + 60 * 60 * 1000;
    const discount = await Discount.create(data);
    return discount;
  } catch (err) {
    throw err;
  }
};

exports.getAllDiscounts = async (query) => {
  try {
    const features = new ApiFeatures(Discount.find({}), query)
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

exports.getDiscount = async (id) => {
  try {
    const discount = await Discount.findById(id);
    if (!discount)
      throw ApiError.notfound(`No Discount found with this id ${id}`);

    return discount;
  } catch (err) {
    throw err;
  }
};

exports.deleteDiscount = async (id) => {
  try {
    const discount = await Discount.findByIdAndDelete(id);
    if (!discount) {
      throw ApiError.notfound(`No Discount found with this id ${id}`);
    }
  } catch (err) {
    throw err;
  }
};

exports.updateDiscount = async (id, data) => {
  try {
    const discount = await Discount.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!discount) {
      throw ApiError.notfound(`No product found with this id ${id}`);
    }

    return discount;
  } catch (err) {
    throw err;
  }
};

// CHECK, USE DISCOUNT

exports.applyDiscount = async (userId, data) => {
  try {
    const { discountCode } = data;
    const discount = await Discount.findOne({
      code: discountCode,
      expiresDate: { $gt: Date.now() },
    });
    if (!discount) {
      throw ApiError.notfound(
        `Your discount code is invalid or has expired!! Please try again`
      );
    }

    if (discount.users.includes(userId)) {
      throw ApiError.notfound(
        `You have already used this one! Please try another one`
      );
    }

    if (discount.remaining === 0) {
      throw ApiError.badRequest('Voucher has already run out');
    }

    discount.remaining = discount.remaining - 1;
    discount.users.push(userId);

    await discount.save({ new: true });

    return discount;
  } catch (err) {
    throw err;
  }
};
