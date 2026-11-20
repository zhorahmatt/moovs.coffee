import { pageMeta } from "@/components/Shell";
import { HomeView } from "@/views/HomeView";

export const metadata = pageMeta("id", "home");

export default function Page() {
  return <HomeView lang="id" />;
}
