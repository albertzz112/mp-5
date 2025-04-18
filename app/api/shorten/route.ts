import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import dns from "dns/promises";

export async function POST(req: NextRequest) {
    const { url, alias } = await req.json();

    // Basic URL validation
    if (!url || typeof url !== "string" || url.trim() === "") {
        return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
        parsedUrl = new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
    }

    // Only allow http and https
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return NextResponse.json({ error: "Only HTTP and HTTPS URLs are allowed." }, { status: 400 });
    }

    // Check DNS resolution of hostname
    try {
        await dns.lookup(parsedUrl.hostname);
    } catch {
        return NextResponse.json({ error: "URL domain could not be resolved." }, { status: 400 });
    }

    // Alias validation
    if (!alias || typeof alias !== "string" || alias.trim() === "") {
        return NextResponse.json({ error: "Alias is required." }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9-_]+$/.test(alias)) {
        return NextResponse.json({ error: "Alias contains invalid characters." }, { status: 400 });
    }

    try {
        const db = await connectToDB();
        const exists = await db.collection("urls").findOne({ alias });

        if (exists) {
            return NextResponse.json({ error: "Alias already taken" }, { status: 400 });
        }

        await db.collection("urls").insertOne({ url, alias });
        return NextResponse.json({ alias }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
