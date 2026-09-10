import { ScrollViewStyleReset } from "expo-router/html";

import React from "react";

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />
        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style
          dangerouslySetInnerHTML={{
            __html: responsiveBackground,
          }}
        />
        {/* On wide screens (portfolio viewed from a desktop) render the app inside
            a centered phone frame instead of a stretched full-width column. On
            phones this media query never applies, so the app stays full-screen. */}
        <style
          dangerouslySetInnerHTML={{
            __html: desktopPhoneFrame,
          }}
        />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;

// 900px: below this we assume a real phone / small tablet and leave the app
// full-screen. Above it, sit the app in a 390x844 device frame.
const desktopPhoneFrame = `
@media screen and (min-width: 900px) {
  body {
    background: radial-gradient(circle at 50% 0%, #2a2a32 0%, #141417 60%, #0c0c0e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 32px 0;
    box-sizing: border-box;
  }
  #root {
    flex: none !important;
    width: 390px !important;
    height: 844px !important;
    max-height: calc(100vh - 64px);
    aspect-ratio: 390 / 844;
    overflow: hidden;
    background: #000;
    border: 14px solid #1b1b1e;
    border-radius: 52px;
    box-shadow:
      0 0 0 2px #3a3a3e,
      0 40px 90px -20px rgba(0, 0, 0, 0.7),
      inset 0 0 0 2px rgba(255, 255, 255, 0.04);
  }
}`;
