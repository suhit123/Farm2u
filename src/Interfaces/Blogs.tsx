export interface comment {
  name: string;
  comment: string;
  publishDate: string;
}
export interface Detailedblog {
  bodycontent: string;
  category: string;
  comments: comment[];
  description: string;
  image: string;
  publishDate: string;
  title: string;
}
export interface DetailedblogPublish {
  bodycontent: string;
  category: string;
  description: string;
  image: string;
  publishDate: string;
  title: string;
}
export interface commentPublish {
  name: string;
  comment: string;
}
export interface Blog {
  _id: number;
  title: string;
  image: string;
  publishDate: string;
  category: string;
  description: string;
}
export interface BlogsProps {
  data: Blog[];
}
