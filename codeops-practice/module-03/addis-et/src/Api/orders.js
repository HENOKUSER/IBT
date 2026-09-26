function placeOrder(form) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject({
          status: 422,
          errors: {
            phone: "This phone number is already used for a pending order",
          },
        });
      } else {
        resolve({ orderId: Date.now() });
      }
    }, 1000);
  });
}

export default placeOrder;
