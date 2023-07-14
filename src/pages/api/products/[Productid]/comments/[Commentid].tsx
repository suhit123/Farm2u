import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';

dbConnect();

export default async (req: any, res: any) => {
  const Productid = req.query.Productid;
  const Commentid = req.query.Commentid;
  const { method } = req;
console.log("hi")
  switch (method) {
    case 'DELETE':
      try {
        const product = await Product.findById(Productid);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        const commentIndex = product.comments.findIndex((comment:any) => comment._id.toString() === Commentid);
        if (commentIndex === -1) {
          return res.status(404).json({ error: 'comments not found' });
        }
        product.comments.splice(commentIndex, 1);
        await product.save();
        res.json({ message: 'comments removed successfully' });
      } catch (error) {
        console.error('Failed to remove comments:', error);
        res.status(500).json({ error: 'Failed to remove comments' });
      }
      break;

    default:
      return res.status(400).json({ error: 'Something went wrong' });
  }
};
