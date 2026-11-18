import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Symbol } from "@/components/Wordmark";
import "@/styles/base.css";
import "@/styles/sections.css";
import "@/styles/pages.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moovs Coffee, Makassar. To accompany your next move.",
  description:
    "Coffee, tea, fresh milktea and matcha for the everyday move. Twenty-one stores across Makassar, open 07:00 to 22:00.",
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

/**
 * Runs before first paint. When the visitor has not asked for reduced motion it
 * turns on motion styles and shows the logo loader: the full version on the
 * first page of a browser session, a brief curtain after that. If the motion
 * system never boots, it backs out, so content can never stay hidden or covered.
 */
const motionBoot = `(function(){var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion','loading');try{if(sessionStorage.getItem('moovs:seen'))d.classList.add('loading-short')}catch(e){}setTimeout(function(){if(!d.classList.contains('motion-booted'))d.classList.remove('motion','loading','loading-short')},4000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        {/* Logo loader and page-transition curtain. Decorative, and only ever shown by the script above. */}
        <div className="loader" data-loader aria-hidden="true">
          <div className="loader__panel">
            <div className="loader__lift">
              <Symbol className="loader__mark" />
            </div>
            <div className="loader__foot">
              <span className="overline">Moovs Coffee, Makassar</span>
              <span className="loader__clock" data-loader-clock>
                06:57
              </span>
            </div>
            <span className="loader__bar" />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
