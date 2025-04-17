import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";

export async function POST(req: NextRequest) {
    const { url, alias } = await req.json();

    try {
        const valid = /^https?:\/\/.+\..+/.test(url);
        if (!valid) {
            return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
        }

        const db = await connectToDB();
        const exists = await db.collection("urls").findOne({ alias });
        if (exists) {
            return NextResponse.json({ error: "Alias already taken" }, { status: 400 });
        }

        await db.collection("urls").insertOne({ url, alias });
        return NextResponse.json({ alias }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
