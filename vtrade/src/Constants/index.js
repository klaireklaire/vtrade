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
