import NRABannerClient from './NRABannerClient';

const HIDE_AFTER_ISO = '2026-05-20T00:00:00-05:00';
const BANNER_HEIGHT = '2.75rem';

export default function NRABanner() {
  if (Date.now() >= new Date(HIDE_AFTER_ISO).getTime()) return null;
  return (
    <>
      {/* Server-render the CSS var so first paint has correct banner + nav offset.
          Client may reset to 0 on /pitch or when user has dismissed (sessionStorage). */}
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{--nra-banner-h:${BANNER_HEIGHT}}`,
        }}
      />
      <NRABannerClient hideAfterIso={HIDE_AFTER_ISO} />
    </>
  );
}
