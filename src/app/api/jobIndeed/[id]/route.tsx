import { EmailTemplate } from '@/app/components/templates/notification';
import scrapeIndeedById from '@/app/helpers/indeed/getInfoJobById';
import { NextResponse, NextRequest } from 'next/server'
import { Resend } from "resend";


interface SegmentI {
  params: {
    id: string;
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest, segments: SegmentI) {
  const { id } = segments.params;
  const response = await scrapeIndeedById({
    url: `https://www.indeed.com/viewjob?jk=${id}&tk=1ht7a6mmekhpd88l&from=serp&vjs=3`,
  });

  const resend = new Resend("re_j63CtS92_LDU4pJYQQsrcqGD3ZkF2giXB");

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "asanchezy@contactbpo.pe",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
  return NextResponse.json({ response });
}