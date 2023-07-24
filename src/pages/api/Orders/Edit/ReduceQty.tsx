import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';
import { getToken } from 'next-auth/jwt';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } };
export default async (req: any, res: any) => {
  const Productid = req.query.Productid;
  const { method } = req;
  switch (method) {
    case 'PATCH':
      try {
        const session: any = await getToken({ req });
        if (!session) {
          return res.status(401).json({ message: 'Not authenticated' });
        }
        // Get the quantity from the request body
        const { quantity } = req.body;
        // Check if the quantity is a valid number
        if (typeof quantity !== 'number' || quantity <= 0) {
          return res.status(400).json({ message: 'Invalid quantity' });
        }
        // Find the product by ID in the database
        const product = await Product.findById(Productid);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        // Reduce the current quantity by the specified amount
        product.quantity -= quantity;
        // Save the updated product in the database
        await product.save();
        return res.status(200).json({ message: 'Quantity updated successfully', product });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
