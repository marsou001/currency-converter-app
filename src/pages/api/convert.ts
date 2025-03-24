// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const currencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'INR', 'RMB', 'KES', 'MYR']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(404).send("The resource you're looking for is not available here!");
  }

  const { body } = req;
  if (typeof body !== "object" && !("source" in body && "target" in body)) {
    res.status(400).send("Invalid input");
  }

  const { source, target } = body;

  if (!currencies.includes(source) || !currencies.includes(target)) {
    res.status(400).send("Invalid input");
  }

  try {
    const API_KEY = process.env.API_KEY;
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${source}/${target}`);
    const data = await response.json();
    res.status(200).send(data.conversion_rate);
  } catch(error) {
    console.log(error)
    res.status(502).send("Something went wrong!")
  }
}
