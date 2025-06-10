const handlePayment = async () => {
  const res = await fetch('/api/payment', {
    method: 'POST',
    body: JSON.stringify({ amount: tournament.entryFee })
  });
  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: order.amount,
    currency: "INR",
    name: "Ludo Tournaments",
    order_id: order.id,
    handler: function(response) {
      // Verify payment on your server
    }
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
};
