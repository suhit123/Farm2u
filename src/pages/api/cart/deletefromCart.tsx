import UserB from '@/models/UserB';
import dbConnect from '@/utils/dbConnect';

dbConnect();

export default async function addToCart(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const user = await UserB.findOne({ _id: userId });
    const existingProductIndex = user.cart.findIndex((item: any) => item.productId === productId);
    user.cart.splice(existingProductIndex, 1);
    await user.save();
    res.status(200).json({ message: 'Deleted product from your cart successfully' });
  } catch (error) {
    res.end();
  }
}