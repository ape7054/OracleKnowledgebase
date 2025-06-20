import React from 'react';

// Using official, standard logos without custom backgrounds or styles.

export const BitcoinIcon = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.225 15.825c.387-.213.687-.513.888-.888.212-.375.312-.812.312-1.312 0-.663-.2-1.225-.6-1.688-.4-.462-.975-.7-1.725-.7h-2.325V9.75h2.138c.637 0 1.175-.213 1.612-.638.438-.425.663-.975.663-1.65 0-.6-.2-1.1-.6-1.5-.4-.4-.9-.6-1.5-.6H9.75v12.75h6c.713 0 1.325-.237 1.838-.712.512-.475.762-1.062.762-1.762 0-.413-.087-.8-.262-1.163-.175-.362-.425-.662-.75-.887h.488zm-4.425-5.55h2.1c.412 0 .75.138 1.012.413.263.275.388.625.388 1.05s-.125.775-.388 1.05a1.27 1.27 0 01-1.012.412h-2.1v-2.925zm0 8.025h2.55c.45 0 .825-.138 1.125-.413.3-.275.45-.625.45-1.05s-.15-.787-.45-1.062c-.3-.275-.675-.413-1.125-.413H11.8v2.938z" fill="#F7931A"/>
  </svg>
);

export const EthereumIcon = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22.414L3.586 12 12 1.586 20.414 12 12 22.414z" fill="#8C8C8C"/>
    <path d="M12 1.586L3.586 12l8.414 3.586 8.414-3.586L12 1.586z" fill="#626262"/>
    <path d="M12 22.414l8.414-10.414-8.414 3.586v6.828z" fill="#8C8C8C"/>
    <path d="M12 22.414V15.586l-8.414-3.586L12 22.414z" fill="#6E6E6E"/>
    <path d="M12 14.586l8.414-2.586-8.414-3.586v6.172z" fill="#626262"/>
    <path d="M3.586 12l8.414-3.586v6.172L3.586 12z" fill="#6E6E6E"/>
  </svg>
);

export const SolanaIcon = (props) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="sol-official-gradient" x1="4.5" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14F195" />
                <stop offset="1" stopColor="#9945FF" />
            </linearGradient>
        </defs>
        <path d="M5.18439 4.33331H18.8157C19.349 4.33331 19.6424 4.96265 19.3357 5.41998L17.3357 8.33331H3.70439C3.17106 8.33331 2.87772 7.70398 3.18439 7.24665L5.18439 4.33331Z" fill="url(#sol-official-gradient)" />
        <path d="M5.18439 9.66663H18.8157C19.349 9.66663 19.6424 10.296 19.3357 10.7533L17.3357 13.6666H3.70439C3.17106 13.6666 2.87772 13.0373 3.18439 12.5799L5.18439 9.66663Z" fill="url(#sol-official-gradient)" />
        <path d="M5.18439 15H18.8157C19.349 15 19.6424 15.6293 19.3357 16.0866L17.3357 19H3.70439C3.17106 19 2.87772 18.3706 3.18439 17.9133L5.18439 15Z" fill="url(#sol-official-gradient)" />
    </svg>
);

export const TetherIcon = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="12" fill="#26A17B"/>
    <path d="M14.5 10H12V7h2.5a1.5 1.5 0 1 1 0 3zm0 4H12v-3h2.5a1.5 1.5 0 1 1 0 3zM11 7H9v10h2V7z" fill="white"/>
  </svg>
);

export const BinanceCoinIcon = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.125 3.375L12 7.5l-4.125-4.125L3.375 7.5 7.5 12l-4.125 4.125L7.5 20.625 12 16.5l4.125 4.125L20.625 16.5 16.5 12l4.125-4.125-4.5-4.5zM12 14.063L9.938 12 12 9.938 14.063 12 12 14.063z" fill="#F0B90B"/>
  </svg>
);

export const CardanoIcon = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm.2-2.9c.1.05.2.05.3 0 .8 0 1.5-.3 2.05-.85l2.7-2.7.05-.05c.05,0,.05-.05.05-.1v-3.55c0-.05-.05-.1-.05-.15l-2.95-2.95c-.55-.55-1.25-.85-2.05-.85s-1.5.3-2.05.85L7.3 9.7c-.05.05-.05.1-.05.15v3.55c0 .05 0 .1.05.15l2.7 2.7.05.05c.55.55 1.25.85 2.05.85zm-.1-1.75c-.45 0-.85-.15-1.15-.45l-2.25-2.25v-2.7l2.5-2.5c.3-.3.7-.45 1.15-.45s.85.15 1.15.45l2.5 2.5v2.7l-2.25 2.25c-.3.3-.7.45-1.15.45z" fill="#0033AD"/>
  </svg>
);
