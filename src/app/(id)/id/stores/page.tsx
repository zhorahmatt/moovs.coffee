import { pageMeta } from "@/components/Shell";
import { StoresView } from "@/views/StoresView";

export const metadata = pageMeta("id", "stores");

export default function Page() {
  return <StoresView lang="id" />;
}
