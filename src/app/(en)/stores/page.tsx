import { pageMeta } from "@/components/Shell";
import { StoresView } from "@/views/StoresView";

export const metadata = pageMeta("en", "stores");

export default function Page() {
  return <StoresView lang="en" />;
}
