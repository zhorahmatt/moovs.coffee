import { pageMeta } from "@/components/Shell";
import { MenuView } from "@/views/MenuView";

export const metadata = pageMeta("id", "menu");

export default function Page() {
  return <MenuView lang="id" />;
}
