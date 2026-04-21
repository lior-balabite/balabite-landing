import type { ReactNode } from 'react';

type CiteProps = {
  children: ReactNode;
  source: string;
  url?: string;
  claim?: string;
};

export function Cite({ children, source, url, claim }: CiteProps) {
  return (
    <span className="cite-wrap">
      <span className="cite-link">{children}</span>
      <span className="cite-tooltip" role="tooltip">
        <span className="cite-label">Source</span>
        {claim && <span className="cite-claim">{claim}</span>}
        <span className="cite-source">{source}</span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="cite-url"
          >
            View source &rarr;
          </a>
        )}
      </span>
    </span>
  );
}
