const profilePictureColors: string[] = [
  "#FFC0CB", "#FFA07A", "#FF7F50", "#FF6347", "#FF4500", "#FFD700",
  "#FFA500", "#FF8C00", "#FF69B4", "#FF1493", "#FF00FF", "#FF0000",
  "#DC143C", "#DB7093", "#CD5C5C", "#C71585"
];

type ProfilePictureColor = {
  color: string;
  textColor: string;
};

const getContrastColor = (hex: string): string => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "#000000" : "#FFFFFF";
};

export const getProfilePictureColor = ({ name }: { name: string }): ProfilePictureColor => {
  const index = name.length % profilePictureColors.length;
  const bgColor = profilePictureColors[index];
  const textColor = getContrastColor(bgColor);
  return { color: bgColor, textColor };
};