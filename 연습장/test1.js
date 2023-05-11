const COLORS = [
  "#4b45ab",
  "#554fb8",
  "#605ac7",
  "#2a91a8",
  "#2e9ab2",
  "#32a5bf",
  "#81b144",
  "#85b944",
  "#8fc549",
  "#e0af27",
  "#eeba2a",
  "#fec72e",
  "#bf342d",
  "#ca3931",
  "#d7423a",
];

const slider = document.querySelector(".slider");

for (let i = 0; i < COLORS.length; i++) {
  const div = document.createElement("div");
  div.textContent = COLORS[i];
  div.style.backgroundColor = COLORS[i];
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.display = "block";

  slider.append(div);
}
