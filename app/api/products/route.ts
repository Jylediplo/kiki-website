import { NextResponse } from 'next/server';
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';

export const GET = async (req: Request, res: Response) => {

    return NextResponse.json({ message: "ok" });
}
