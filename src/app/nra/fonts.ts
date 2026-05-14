import { Instrument_Serif, Inter } from 'next/font/google';

/**
 * Fonts for the NRA signup surfaces (/nra and /NRA-booklet).
 * Shared so both routes load identical typography without duplication.
 */

export const nraSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-nra-serif',
  display: 'swap',
});

export const nraSans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nra-sans',
  display: 'swap',
});

export const nraFontClass = `${nraSerif.variable} ${nraSans.variable}`;
