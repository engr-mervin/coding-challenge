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

export async function GET() {
  try {
    const { data, error } = await supabase.from("challenge").select();
    console.log(data);

    if (error) {
      throw error;
    }
    return NextResponse.json({ message: "ok", status: 200, data });
  } catch (error) {
    return NextResponse.json({ message: "fail", status: 500, error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const url = data.get("url");

    const { error } = await supabase
      .from("challenge")
      .update({ url })
      .eq("id", 1);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "ok", status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "fail", status: 500, error });
  }
}
