export const MENU_ITEMS = [
  { id: "Housing", text: "Housing" },
  { id: "Goods", text: "Goods" },
  { id: "Jobs", text: "Jobs" },
  { id: "Personals", text: "Personals" },
  { id: "Services", text: "Services" },
];

export const selectedSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <rect x="1" y="1" width="18" height="18" rx="1" fill="#373F41" />
    <path
      d="M15.9902 6.99996L14.5802 5.57996L7.99023 12.17L5.41023 9.59996L3.99023 11.01L7.99023 15L15.9902 6.99996Z"
      fill="white"
    />
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="1"
      stroke="#373F41"
      strokeWidth="2"
    />
  </svg>
);

export const unselectedSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <rect x="1" y="1" width="18" height="18" rx="1" fill="white" />
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="1"
      stroke="#373F41"
      strokeWidth="2"
    />
  </svg>
);

export const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const shareSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z" />
  </svg>
);

export const unfilledHeartSvg = (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
  >
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
  </svg>
);

export const filledHeartSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
  </svg>
);

export const arrowUpSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <circle
      cx="22"
      cy="22.0001"
      r="8.66667"
      transform="rotate(-180 22 22.0001)"
      stroke="#3C64B1"
    />
    <path d="M18.3333 23.8333L22 20.1666L25.6667 23.8333" stroke="#3C64B1" />
  </svg>
);

export const arrowDownSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <circle cx="22" cy="22.0002" r="8.66667" stroke="#3C64B1" />
    <path d="M25.6667 20.1665L22 23.8332L18.3333 20.1665" stroke="#3C64B1" />
  </svg>
);

export const calendarSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <g clip-path="url(#clip0_808_1851)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.25 2.0625C2.14645 2.0625 2.0625 2.14645 2.0625 2.25V15.75C2.0625 15.8536 2.14645 15.9375 2.25 15.9375H15.75C15.8536 15.9375 15.9375 15.8536 15.9375 15.75V2.25C15.9375 2.14645 15.8536 2.0625 15.75 2.0625H2.25ZM0.9375 2.25C0.9375 1.52513 1.52513 0.9375 2.25 0.9375H15.75C16.4749 0.9375 17.0625 1.52513 17.0625 2.25V15.75C17.0625 16.4749 16.4749 17.0625 15.75 17.0625H2.25C1.52513 17.0625 0.9375 16.4749 0.9375 15.75V2.25Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.9375 5.25C0.9375 4.93934 1.18934 4.6875 1.5 4.6875H16.5C16.8107 4.6875 17.0625 4.93934 17.0625 5.25C17.0625 5.56066 16.8107 5.8125 16.5 5.8125H1.5C1.18934 5.8125 0.9375 5.56066 0.9375 5.25Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.5 3.5625C16.8107 3.5625 17.0625 3.81434 17.0625 4.125V8.625C17.0625 8.93566 16.8107 9.1875 16.5 9.1875C16.1893 9.1875 15.9375 8.93566 15.9375 8.625V4.125C15.9375 3.81434 16.1893 3.5625 16.5 3.5625Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.9375 8.25C3.9375 7.93934 4.18934 7.6875 4.5 7.6875H6C6.31066 7.6875 6.5625 7.93934 6.5625 8.25C6.5625 8.56066 6.31066 8.8125 6 8.8125H4.5C4.18934 8.8125 3.9375 8.56066 3.9375 8.25Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.6875 8.25C7.6875 7.93934 7.93934 7.6875 8.25 7.6875H9.75C10.0607 7.6875 10.3125 7.93934 10.3125 8.25C10.3125 8.56066 10.0607 8.8125 9.75 8.8125H8.25C7.93934 8.8125 7.6875 8.56066 7.6875 8.25Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4375 8.25C11.4375 7.93934 11.6893 7.6875 12 7.6875H13.5C13.8107 7.6875 14.0625 7.93934 14.0625 8.25C14.0625 8.56066 13.8107 8.8125 13.5 8.8125H12C11.6893 8.8125 11.4375 8.56066 11.4375 8.25Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.9375 10.875C3.9375 10.5643 4.18934 10.3125 4.5 10.3125H6C6.31066 10.3125 6.5625 10.5643 6.5625 10.875C6.5625 11.1857 6.31066 11.4375 6 11.4375H4.5C4.18934 11.4375 3.9375 11.1857 3.9375 10.875Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.6875 10.875C7.6875 10.5643 7.93934 10.3125 8.25 10.3125H9.75C10.0607 10.3125 10.3125 10.5643 10.3125 10.875C10.3125 11.1857 10.0607 11.4375 9.75 11.4375H8.25C7.93934 11.4375 7.6875 11.1857 7.6875 10.875Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4375 10.875C11.4375 10.5643 11.6893 10.3125 12 10.3125H13.5C13.8107 10.3125 14.0625 10.5643 14.0625 10.875C14.0625 11.1857 13.8107 11.4375 13.5 11.4375H12C11.6893 11.4375 11.4375 11.1857 11.4375 10.875Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.9375 13.5C3.9375 13.1893 4.18934 12.9375 4.5 12.9375H6C6.31066 12.9375 6.5625 13.1893 6.5625 13.5C6.5625 13.8107 6.31066 14.0625 6 14.0625H4.5C4.18934 14.0625 3.9375 13.8107 3.9375 13.5Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.6875 13.5C7.6875 13.1893 7.93934 12.9375 8.25 12.9375H9.75C10.0607 12.9375 10.3125 13.1893 10.3125 13.5C10.3125 13.8107 10.0607 14.0625 9.75 14.0625H8.25C7.93934 14.0625 7.6875 13.8107 7.6875 13.5Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4375 13.5C11.4375 13.1893 11.6893 12.9375 12 12.9375H13.5C13.8107 12.9375 14.0625 13.1893 14.0625 13.5C14.0625 13.8107 13.8107 14.0625 13.5 14.0625H12C11.6893 14.0625 11.4375 13.8107 11.4375 13.5Z"
        fill="#373F41"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.5 3.5625C1.81066 3.5625 2.0625 3.81434 2.0625 4.125V8.625C2.0625 8.93566 1.81066 9.1875 1.5 9.1875C1.18934 9.1875 0.9375 8.93566 0.9375 8.625V4.125C0.9375 3.81434 1.18934 3.5625 1.5 3.5625Z"
        fill="#373F41"
      />
    </g>
    <defs>
      <clipPath id="clip0_808_1851">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const starSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.99803 1.3125C9.21221 1.31195 9.40812 1.43308 9.50333 1.62493L11.6946 6.04002L16.5812 6.75255C16.7928 6.7834 16.9685 6.93155 17.0348 7.13485C17.1011 7.33814 17.0463 7.56143 16.8936 7.71104L13.3395 11.1917L14.1837 16.0283C14.2206 16.2401 14.1336 16.4544 13.9595 16.5805C13.7854 16.7067 13.5547 16.7225 13.365 16.6214L8.99951 14.2946L4.63502 16.6214C4.44519 16.7226 4.21426 16.7066 4.04013 16.5803C3.86599 16.454 3.77915 16.2395 3.8164 16.0276L4.66671 11.1917L1.10678 7.71138C0.953759 7.56179 0.898879 7.33833 0.965186 7.13487C1.03149 6.93141 1.2075 6.78319 1.41928 6.75249L6.33258 6.04003L8.49434 1.62752C8.58857 1.43519 8.78385 1.31305 8.99803 1.3125ZM9.00274 3.14687L7.21224 6.80158C7.13051 6.9684 6.97167 7.08412 6.78782 7.11078L2.707 7.70252L5.66531 10.5947C5.79808 10.7245 5.85824 10.9115 5.82609 11.0943L5.12428 15.0857L8.73486 13.1608C8.90024 13.0727 9.09867 13.0727 9.26405 13.1608L12.8773 15.0867L12.1804 11.0936C12.1485 10.9111 12.2085 10.7247 12.3409 10.595L15.295 7.70191L11.2406 7.11071C11.0579 7.08408 10.8999 6.96952 10.8179 6.80417L9.00274 3.14687Z"
      fill="#373F41"
    />
  </svg>
);

export const checkMark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="88"
    height="88"
    viewBox="0 0 88 88"
    fill="none"
  >
    <path
      opacity="0.2"
      d="M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z"
      fill="#2DB324"
    />
    <path
      d="M59.125 35.75L38.9469 55L28.875 45.375"
      stroke="#2DB324"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z"
      stroke="#2DB324"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const dashboard = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clip-path="url(#clip0_2107_1237)">
      <path
        d="M2.5 13.75L10 18.125L17.5 13.75"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 10L10 14.375L17.5 10"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2107_1237">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M3.125 10H16.875"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.25 4.375L16.875 10L11.25 15.625"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const stackBlack = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.2"
      d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
      fill="#5F6C72"
    />
    <path
      d="M2.5 13.75L10 18.125L17.5 13.75"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 10L10 14.375L17.5 10"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const stackWhite = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.2"
      d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
      fill="white"
    />
    <path
      d="M2.5 13.75L10 18.125L17.5 13.75"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 10L10 14.375L17.5 10"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const heartBlack = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 16.875C10 16.875 2.1875 12.5 2.1875 7.18751C2.1875 6.24836 2.51289 5.33821 3.1083 4.61193C3.70371 3.88564 4.53236 3.38808 5.45328 3.2039C6.37419 3.01971 7.33047 3.16029 8.15943 3.6017C8.98838 4.04311 9.63879 4.7581 10 5.62501C10.3612 4.7581 11.0116 4.04311 11.8406 3.6017C12.6695 3.16029 13.6258 3.01971 14.5467 3.2039C15.4676 3.38808 16.2963 3.88564 16.8917 4.61193C17.4871 5.33821 17.8125 6.24836 17.8125 7.18751C17.8125 12.5 10 16.875 10 16.875Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const heartWhite = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 16.875C10 16.875 2.1875 12.5 2.1875 7.18751C2.1875 6.24836 2.51289 5.33821 3.1083 4.61193C3.70371 3.88564 4.53236 3.38808 5.45328 3.2039C6.37419 3.01971 7.33047 3.16029 8.15943 3.6017C8.98838 4.04311 9.63879 4.7581 10 5.62501C10.3612 4.7581 11.0116 4.04311 11.8406 3.6017C12.6695 3.16029 13.6258 3.01971 14.5467 3.2039C15.4676 3.38808 16.2963 3.88564 16.8917 4.61193C17.4871 5.33821 17.8125 6.24836 17.8125 7.18751C17.8125 12.5 10 16.875 10 16.875Z"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const logoutWhite = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5938 6.71875L16.875 10L13.5938 13.2812"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.125 10H16.875"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.125 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H8.125"
      stroke="#5F6C72"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const logoutBlack = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5938 6.71875L16.875 10L13.5938 13.2812"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.125 10H16.875"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.125 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H8.125"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const settingsBlack = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 48 48"
  >
    <path d="M0 0h48v48h-48z" fill="none" />
    <path
      d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97l-.75-5.3c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97l-4.98-2.01c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31c-.08.64-.14 1.29-.14 1.95s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zm-14.86 5.05c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
      fill="#fff"
    />
  </svg>
);

export const settingsWhite = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 48 48"
  >
    <path d="M0 0h48v48h-48z" fill="none" />
    <path
      d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97l-.75-5.3c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97l-4.98-2.01c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31c-.08.64-.14 1.29-.14 1.95s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zm-14.86 5.05c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
      fill="#5F6C72"
    />
  </svg>
);

export const rightArrowPag = (
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.780396"
      y="0.75"
      width="38.5"
      height="38.5"
      rx="19.25"
      stroke="black"
      stroke-width="1.5"
    />
    <path
      d="M11.7804 20H28.2804"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.5304 13.25L28.2804 20L21.5304 26.75"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const leftArrowPag = (
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.780396"
      y="0.75"
      width="38.5"
      height="38.5"
      rx="19.25"
      stroke="black"
      stroke-width="1.5"
    />
    <path
      d="M28.2804 20H11.7804"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.5304 13.25L11.7804 20L18.5304 26.75"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
