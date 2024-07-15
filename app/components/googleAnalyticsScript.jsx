"use client";
import { useEffect } from "react";
// import { GoogleAnalytics } from "@next/third-parties/google";
// import { initGA, logPageView } from "./components/analitcs";

import Script from "next/script";
const GoogleAnalytcsScripts = () => {
  // useEffect(() => {
  //   initGA(); // Initialize Google Analytics
  //   logPageView(); // Log the initial page view
  // }, []);

  return (
    <>
      <Script id="hotjar-script">
        {`
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5032859,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `}
      </Script>
    </>
  );
};

export default GoogleAnalytcsScripts;
