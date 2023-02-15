// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { demoData } from '@/constant/demo-data/demoData';

export default function getDemoData(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ demoData });
}
