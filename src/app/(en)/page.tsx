import { pageMeta } from "@/components/Shell";
import { HomeView } from "@/views/HomeView";

export const metadata = pageMeta("en", "home");

export default function Page() {
  return <HomeView lang="en" />;
}
