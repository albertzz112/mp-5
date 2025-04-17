import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/db";
import type { Metadata } from "next";

type Props = {
    params: {
        alias: string;
    };
};

export const metadata: Metadata = {
    title: "Redirecting...",
};

export default async function AliasPage({ params }: Props) {
    const { alias } = params;

    const db = await connectToDB();
    const record = await db.collection("urls").findOne({ alias });

    if (!record) {
        return <div className="p-4 text-center">Alias not found</div>;
    }

    redirect(record.url);
}
