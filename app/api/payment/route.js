import Razorpay from 'razorpay';
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

export async function POST(req) {
  const { amount, tournamentId } = await req.json();
  
  const options = {
    amount: amount * 100, // INR paise
    currency: "INR",
    receipt: `txn_${tournamentId}_${Date.now()}`
  };

  const order = await razorpay.orders.create(options);
  return Response.json(order);
}
