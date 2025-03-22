import { Router } from "express";
import moment from "moment";
import qs from "querystring";
import crypto from "crypto";
import orderModel from "../models/orderModel";

const vnpayRouter = Router();

const config = {
  vnp_TmnCode: "MTV05YVA",
  vnp_HashSecret: "PBNLKF8YGRNCPXLDJLY9V1023CW8206U",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: "http://localhost:3000/vnpay_return",
};

function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

// Endpoint tạo URL thanh toán
vnpayRouter.get("/create_payment_url", (req, res) => {
  let ipAddr = req.ip;
  let tmnCode = config.vnp_TmnCode;
  let secretKey = config.vnp_HashSecret;
  let vnpUrl = config.vnp_Url;
  let returnUrl = config.vnp_ReturnUrl;
  let orderId = req.query.orderId || moment().format("YYYYMMDDHHmmss");
  let amount = req.query.amount;
  let bankCode = req.query.bankCode || "";

  let createDate = moment().format("YYYYMMDDHHmmss");
  let orderInfo = "Thanh_toan_don_hang";
  let locale = req.query.language || "vn";
  let currCode = "VND";

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "billpayment",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let signData = qs.stringify(vnp_Params);
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  let paymentUrl = vnpUrl + "?" + qs.stringify(vnp_Params);
  res.json({ paymentUrl });
});

// Endpoint xử lý phản hồi từ VNPay
vnpayRouter.get("/vnpay_return", async (req, res) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);
  const orderId = query.vnp_TxnRef;
  const responseCode = query.vnp_ResponseCode;

  let secretKey = config.vnp_HashSecret;
  let signData = qs.stringify(vnp_Params);
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash !== signed) {
    return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
  }

  await order.save();
  // Cập nhật trạng thái đơn hàng
  const order = await orderModel.findOne({ orderId });

  if (!order) {
    return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
  }

  if (responseCode === "00") {
    order.status = "paid"; // Thanh toán thành công
  } else {
    order.status = "failed"; // Thanh toán thất bại
  }
  await order.save();
  res.json({
    message:
      responseCode === "00" ? "Thanh toán thành công" : "Thanh toán thất bại",
    order,
  });
  // if (secureHash === signed) {
  //   res.json({ message: "Thanh toán thành công!", data: vnp_Params });
  // } else {
  //   res.json({ message: "Thanh toán thất bại!" });
  // }
});

export default vnpayRouter;
