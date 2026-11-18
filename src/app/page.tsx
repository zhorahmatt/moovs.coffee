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

export default function Page() {
  return (
    <>
      <Nav arrow={<Icon name="arrow-right-up-linear" size={16} />} />
      <main id="main">
        <Hero />
        <Manifesto />
        <Day />
        <Menu />
        <Stores />
        <Membership />
        <Stories />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
