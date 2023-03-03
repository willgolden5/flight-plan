import { type NextApiRequest, type NextApiResponse } from "next";



export default function alpha(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
}