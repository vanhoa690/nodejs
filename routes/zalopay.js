import { Router } from "express";
import crypto from "crypto";
import axios from "axios";

const zalopayRouter = Router();

const ZALOPAY_APP_ID = 2554;
const ZALOPAY_KEY1 = "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn";
const ZALOPAY_ENDPOINT = "https://sb-openapi.zalopay.vn/v2/create";

// API Tạo đơn hàng thanh toán
zalopayRouter.post("/create_zalopay_order", async (req, res) => {
  try {
    const date = new Date();
    const app_trans_id = `${date.getFullYear().toString().slice(-2)}${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${date
      .getDate()
      .toString()
      .padStart(2, "0")}_${Math.floor(Math.random() * 1000000)}`;

    const app_user = "user123";
    const app_time = Date.now();
    const amount = 10000;
    const item = JSON.stringify([
      { name: "Test Product", price: amount, quantity: 1 },
    ]);
    const callback_url =
      "http://localhost:5173/payment-result?paymentMethod=zalopay";
    const embed_data = JSON.stringify({ redirecturl: callback_url });
    // const callback_url = "http://localhost:3000/zalopay_return";
    console.log(embed_data);

    const orderData = {
      app_id: ZALOPAY_APP_ID,
      app_trans_id,
      app_user,
      app_time,
      amount,
      item,
      embed_data,
      description: `Thanh toán đơn hàng #${app_trans_id}`,
      // callback_url:
      //   "https://5816-116-96-47-93.ngrok-free.app/payment-zalopay_return",
      // bank_code: "CC",
    };

    // Tạo MAC
    const dataMac = `${orderData.app_id}|${orderData.app_trans_id}|${orderData.app_user}|${orderData.amount}|${orderData.app_time}|${orderData.embed_data}|${orderData.item}`;
    orderData.mac = crypto
      .createHmac("sha256", ZALOPAY_KEY1)
      .update(dataMac)
      .digest("hex");

    // console.log("Dữ liệu gửi lên ZaloPay:", orderData);

    // Gửi request đến ZaloPay API
    const response = await axios.post(ZALOPAY_ENDPOINT, orderData, {
      headers: { "Content-Type": "application/json" },
    });

    // console.log("Response từ ZaloPay:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(
      "Lỗi tạo đơn hàng ZaloPay:",
      error.response?.data || error.message
    );
  }
});

// API xử lý callback từ ZaloPay
zalopayRouter.get("/check_payment", (req, res) => {
  console.log("ZaloPay Callback Data:", req.query);
  res.json({ message: "Callback received", data: req.query });
});

export default zalopayRouter;
