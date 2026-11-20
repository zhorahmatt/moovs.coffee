import { Shell } from "@/components/Shell";

export { viewport } from "@/components/Shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
