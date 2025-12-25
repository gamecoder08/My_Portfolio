import { headers } from "next/headers";
import HomeClient from "./components/sub/HomeClient";

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
  return (
    <main className="h-full w-full">
      <HomeClient isMobile={isMobile} />
    </main>
  );
}
