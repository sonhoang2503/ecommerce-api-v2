const catchAsyncExp = require('../helpers/catchAsync');
const discountService = require('../services/discount.service');

exports.createDiscount = catchAsyncExp(async (req, res, next) => {
  const discount = await discountService.createDiscount(req.body);
  res.status(200).json({
    status: 'success',
    discount: discount,
  });
});

exports.getAllDiscounts = catchAsyncExp(async (req, res, next) => {
  const discounts = await discountService.getAllDiscounts(req.query);

  res.status(200).json({
    status: 'success',
    discounts: discounts,
  });
});

exports.getDiscount = catchAsyncExp(async (req, res, next) => {
  const discount = await discountService.getDiscount(req.params.id);

  res.status(200).json({
    status: 'success',
    discount: discount,
  });
});

exports.deleteDiscount = catchAsyncExp(async (req, res, next) => {
  await discountService.deleteDiscount(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'Discount code was deleted successfully',
  });
});

exports.updateDiscount = catchAsyncExp(async (req, res, next) => {
  const discount = await discountService.updateDiscount(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    discount: discount,
  });
});

exports.applyDiscount = catchAsyncExp(async (req, res, next) => {
  const discount = await discountService.applyDiscount(req.user.id, req.body);

  res.status(200).json({
    status: 'success',
    discount: discount,
  });
});
