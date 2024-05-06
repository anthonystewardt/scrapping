import { NextResponse, NextRequest } from 'next/server'
import axios from "axios";
import { JSDOM } from "jsdom";
import scrapeIndeed from '@/app/helpers/indeed/getInfoJob';
import { useSearchParams } from 'next/navigation';
import { Resend } from "resend";

// await scrapeIndeed('indeed', 0, '.jobTitle', 'call center', 'california');

interface SegmentI {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest) {
  const params = await request.nextUrl.searchParams;
  const namePosition = params.get("namePosition");
  const location = params.get("location");

  const response = await scrapeIndeed(
    {
      websiteName: "indeed",
      pageNumber: 0,
      className: ".jobTitle",
      namePosition: namePosition || "call center",
      location: location || "lima",
    }
  );
  
  const resend = new Resend("re_j63CtS92_LDU4pJYQQsrcqGD3ZkF2giXB");

  const responseEmail = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "asanchezy@contactbpo.pe",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
  console.log({
    responseEmail
  })
  return NextResponse.json({
    response,
    responseEmail
  });
}