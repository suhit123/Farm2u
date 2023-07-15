import dbConnect from '@/utils/dbConnect';
import BlogsA from '@/models/BlogsA';

dbConnect();

export default async (req: any, res: any) => {
  const Blogid = req.query.Blogid;
  const commentId = req.query.commentId;
  const { method } = req;

  switch (method) {
    case 'DELETE':
      try {
        const Blog = await BlogsA.findById(Blogid);
        if (!Blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        const commentIndex = Blog.comments.findIndex((comment:any) => comment._id.toString() === commentId);
        if (commentIndex === -1) {
          return res.status(404).json({ error: 'comments not found' });
        }
        Blog.comments.splice(commentIndex, 1);
        await Blog.save();
        return res.json({ message: 'comments removed successfully' });
      } catch (error) {
        console.error('Failed to remove comments:', error);
        return res.status(500).json({ error: 'Failed to remove comments' });
      }
      break;

    default:
      return res.status(400).json({ error: 'Something went wrong' });
  }
};
