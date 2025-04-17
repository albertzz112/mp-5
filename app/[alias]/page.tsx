export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/db";

interface Props {
    params: { alias: string };
}

export default async function AliasPage({ params }: Props) {
    const db = await connectToDB();
    const record = await db.collection("urls").findOne({ alias: params.alias });

    if (!record) {
        return <div className="p-4 text-center">Alias not found</div>;
    }

    redirect(record.url);
}
