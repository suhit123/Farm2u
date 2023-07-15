import dbConnect from '@/utils/dbConnect';
import Orderi from '@/models/Orderi';
import { NextApiRequest, NextApiResponse } from 'next';

dbConnect();

export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { orderId } = req.query;
  console.log(orderId)
  switch (method) {
    case 'PATCH':
      try {
        const updatedOrder = await Orderi.findByIdAndUpdate(
          orderId,req.body );

        if (!updatedOrder) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }

        return res.status(200).json({ success: true, message: 'Order updated successfully', data: updatedOrder });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    default:
      return res.status(400).json({ success: false, message: 'Invalid request method' });
  }
}
