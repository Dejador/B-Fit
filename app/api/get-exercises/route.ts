import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const headersInfo: {} = {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_HOST,
    };
    const url = 'https://exercisedb.p.rapidapi.com/exercises';
    const res = await fetch(url, {
      method: 'GET',
      headers: headersInfo,
      cache: 'no-store'
    });
    const data = await res.json();

    return NextResponse.json({ statusCode: 200, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ statusCode: 500, error });
  }
}
