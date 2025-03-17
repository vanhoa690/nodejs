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

// Endpoint tạo URL thanh toán
vnpayRouter.get("/create_payment_url", (req, res) => {
  console.log("Client IP:", req.ip);

  let ipAddr = req.ip === "::1" ? "127.0.0.1" : req.ip;
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

  // Kiểm tra và xử lý amount
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ message: "Amount không hợp lệ!" });
  }

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "billpayment",
    vnp_Amount: Number(amount) * 100, // Nhân 100 theo chuẩn VNPay
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  console.log("vnp_Params trước khi sort:", vnp_Params);
  vnp_Params = sortObject(vnp_Params);

  let signData = qs.stringify(vnp_Params, { encode: false });
  console.log("signData:", signData);
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  let paymentUrl = vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });
  console.log("Generated paymentUrl:", paymentUrl);
  res.json({ paymentUrl });
});

// Endpoint xử lý phản hồi từ VNPay
vnpayRouter.get("/vnpay_return", (req, res) => {
  let fakeVnpayReturn = {
    vnp_Amount: "100000000", // 1,000,000 VND * 100
    vnp_BankCode: "NCB",
    vnp_BankTranNo: "VNP12345678",
    vnp_CardType: "ATM",
    vnp_OrderInfo: "Thanh toan don hang",
    vnp_PayDate: "20250316123456",
    vnp_ResponseCode: "00",
    vnp_TmnCode: "MTV05YVA",
    vnp_TransactionNo: "13579246",
    vnp_TransactionStatus: "00",
    vnp_TxnRef: "20250316123456",
  };
  
  let sortedParams = sortObject(fakeVnpayReturn);
  let signData = qs.stringify(sortedParams, { encode: false });
  let hmac = crypto.createHmac("sha512", "PBNLKF8YGRNCPXLDJLY9V1023CW8206U");
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  console.log("vnp_SecureHash:", signed);
});

export default vnpayRouter;