import { pageMeta } from "@/components/Shell";
import { MenuView } from "@/views/MenuView";

export const metadata = pageMeta("en", "menu");

export default function Page() {
  return <MenuView lang="en" />;
}
