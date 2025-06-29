import { headers } from "next/headers";

export async function getUserIP() {
    const headersList = await headers();

    const ip = 
    headersList.get("x-forwarded-for")?.split(',')[0] ||
    headersList.get("x-real-ip");
    return ip;

}