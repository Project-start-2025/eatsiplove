import { NextApiRequest, NextApiResponse } from 'next';

let pendingRequests: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, address, phone, ownerId } = req.body;

    const newRequest = {
      id: Date.now(),
      name,
      address,
      phone,
      ownerId,
      status: 'pending',
      createdAt: new Date(),
    };

    pendingRequests.push(newRequest);
    res.status(201).json({ message: 'Đã gửi yêu cầu thành công', request: newRequest });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}