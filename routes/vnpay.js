import { Router } from "express";
import moment from "moment";
import qs from "querystring";
import crypto from "crypto";

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

vnpayRouter.get("/create_payment_url", (req, res) => {
  let ipAddr = req.ip;
  let tmnCode = config.vnp_TmnCode;
  let secretKey = config.vnp_HashSecret;
  let vnpUrl = config.vnp_Url;
  let returnUrl = config.vnp_ReturnUrl;
  let orderId = moment().format("YYYYMMDDHHmmss");
  let amount = req.query.amount;
  let bankCode = req.query.bankCode || "";

  let createDate = moment().format("YYYYMMDDHHmmss");
  let orderInfo = "Thanh toan don hang";
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

  let signData = qs.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  let paymentUrl = vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });
  res.json({ paymentUrl });
});

vnpayRouter.get("/vnpay_return", (req, res) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);

  let secretKey = config.vnp_HashSecret;
  let signData = qs.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    res.json({ message: "Thanh toán thành công!", data: vnp_Params });
  } else {
    res.json({ message: "Thanh toán thất bại!" });
  }
});
export default vnpayRouter;
