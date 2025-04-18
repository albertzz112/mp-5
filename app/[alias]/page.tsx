import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/db";

export default async function AliasPage({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;

    const db = await connectToDB();
    const record = await db.collection("urls").findOne({ alias });

    if (!record) {
        return <div className="p-4 text-center">Alias not found</div>;
    }

    redirect(record.url);
}