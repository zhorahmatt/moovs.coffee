import { Icon } from "@/components/Icon";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Closing, Footer } from "@/components/sections/Closing";
import { Day } from "@/components/sections/Day";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Membership } from "@/components/sections/Membership";
import { Menu } from "@/components/sections/Menu";
import { Stores } from "@/components/sections/Stores";
import { Stories } from "@/components/sections/Stories";
import type { Lang } from "@/lib/i18n";

export function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <Nav lang={lang} arrow={<Icon name="arrow-right-up-linear" size={16} />} />
      <main id="main">
        <Hero lang={lang} />
        <Manifesto lang={lang} />
        <Day lang={lang} />
        <Menu lang={lang} />
        <Stores lang={lang} />
        <Membership lang={lang} />
        <Stories lang={lang} />
        <Closing lang={lang} />
      </main>
      <Footer lang={lang} />
      <Motion />
    </>
  );
}
