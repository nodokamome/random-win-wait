import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AdsCard = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-2758446893229152"
        data-ad-slot="4917151733"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdsCard
