import { NextRequest, NextResponse } from "next/server";
import { deepCopyWithCount } from "../../../../util/process-json";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const url = body.get("query") as string;

    const response = await fetch(url);

    const data = await response.json();
    const processedData = deepCopyWithCount(data);

    return NextResponse.json({
      message: "ok",
      status: 200,
      original: data,
      processed: processedData,
    });
  } catch (error) {
    return NextResponse.json({ message: "fail", status: 500, error });
  }
}
