import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || "",
  {
    auth: {
      persistSession: false,
    },
  }
);

export async function GET(req: NextRequest) {
  const { data, error } = await supabase.from("challenge").select();
  console.log(data);

  return NextResponse.json({ message: "ok", status: 200, data });
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const url = data.get("url");

  const { error } = await supabase
    .from("challenge")
    .update({ url })
    .eq("id", 1);

  return NextResponse.json({ message: "ok", status: 201 });
}
