'use client';

import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On cream bg throughout since hero is now cream
  const bgClass = !isScrolled
    ? 'bg-transparent'
    : 'bg-cream-100/80 backdrop-blur-lg shadow-lg shadow-black/5';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-4">
        {/* Logo — SVG inline so we can control color */}
        <a href="/" className="flex items-center gap-2.5">
          <svg
            width="36"
            height="40"
            viewBox="0 0 236 324"
            className="text-primary-900"
            aria-label="BalaBite"
          >
            <path
              fill="currentColor"
              transform="scale(0.273148 0.273649)"
              d="M421.969 291.614C440.842 288.834 467.744 294.882 484.957 303.052C514.002 316.826 536.314 341.66 546.905 372.003C565.976 426.187 542.483 488.35 486.953 508.401C455.206 519.865 424.134 511.101 395.073 497.077C371.336 577.397 353.219 660.059 349.295 744.067C347.857 774.85 347.8 807.975 366.85 834.049C379.852 851.853 399.476 863.674 421.297 866.848C446.27 870.762 471.764 864.405 491.973 849.225C511.29 834.676 524.083 813.964 527.453 789.911C530.744 766.414 525.834 743.601 511.231 724.546C498.486 707.765 479.369 697.029 458.724 693.524C454.332 692.778 449.858 692.871 445.432 692.379C437.977 691.552 433.394 684.689 435.098 677.466C435.869 674.111 438.012 671.233 441.006 669.531C447.732 665.712 466.823 669.671 474.25 671.685C501.649 678.856 525 696.766 539.025 721.365C555.309 749.804 556.95 779.275 548.497 810.394C544.834 822.275 539.274 833.486 532.034 843.594C513.881 869.002 486.371 886.156 455.56 891.277C425.897 896.12 394.802 890.147 370.369 872.362C328.007 841.651 321.985 795.281 324.303 746.572C328.299 658.198 347.099 570.635 372.561 486.132C381.231 457.357 387.655 463.607 409.385 475.937C443.677 495.396 488.232 493.735 513.098 459.394C526.238 441.247 530.595 419.293 527.363 396.847C523.798 372.155 510.444 349.936 490.31 335.195C469.343 319.671 443.026 313.198 417.248 317.224C378.309 323.033 345.469 351.584 337.586 390.65C335.621 399.726 336.875 414.447 323.734 414.96C307.184 415.607 310.446 397.587 312.506 387.802C316.747 367.66 324.989 349.701 338.238 334.11C359.421 309.424 389.532 294.142 421.969 291.614Z"
            />
            <path
              fill="currentColor"
              transform="scale(0.273148 0.273649)"
              d="M432.464 373.605C446.765 373.08 458.801 384.209 459.391 398.503C459.98 412.797 448.902 424.879 434.606 425.532C420.219 426.19 408.039 415.029 407.446 400.644C406.852 386.259 418.072 374.133 432.464 373.605Z"
            />
            <path
              fill="currentColor"
              transform="scale(0.273148 0.273649)"
              d="M431.205 758.727C445.378 757.47 457.921 767.852 459.33 782.006C460.739 796.159 450.488 808.809 436.345 810.368C427.062 811.392 417.944 807.351 412.469 799.786C406.994 792.222 406.007 782.3 409.883 773.806C413.759 765.311 421.902 759.553 431.205 758.727Z"
            />
          </svg>
          <span className="font-bold text-primary-900 text-lg tracking-tight">
            balabite
          </span>
        </a>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={onCtaClick}
            className="hidden sm:block rounded-full bg-primary-900 text-cream-100 hover:bg-primary-800 px-5 py-2 text-sm font-semibold transition-all duration-200"
          >
            Put AI to Work
          </button>
        </div>
      </div>
    </nav>
  );
}
