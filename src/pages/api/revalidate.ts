import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/"); // 루트 페이지를 다시 생성
    return res.status(200).json({ revalidated: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to revalidate" });
  }
}
