export class Color {
  static colorsUsed: string[] = [];
  static colorsMap: { [key: string]: string } = {
    Red: "#e6194b",
    Green: "#3cb44b",
    Yellow: "#ffe119",
    Blue: "#4363d8",
    Orange: "#f58231",
    Purple: "#911eb4",
    Turquoise: "#46f0f0",
    Pink: "#f032e6",
    Lime: "#bcf60c",
    Salmon: "#fabebe",
    Teal: "#008080",
    Lavender: "#e6beff",
    Brown: "#9a6324",
    Banana: "#fffac8",
    Maroon: "#800000",
    Mint: "#aaffc3",
    Olive: "#808000",
    Creamsicle: "#ffd8b1",
    Navy: "#000075",
    Gray: "#808080"
  };

  colorName: string;
  colorHex: string;

  constructor(colorName?: string) {
    if (colorName !== undefined) {
      this.colorName = colorName;
    } else {
      this.colorName = Color.getRandomColorName();
    }

    this.colorHex = Color.colorsMap[this.colorName];
    Color.colorsUsed.push(this.colorName);
  }

  static getRandomColorName(): string {
    const colors = Object.keys(this.getUnusedColors());
    return colors[Math.floor(Math.random() * colors.length)];
  }

  static getUnusedColors(): { [key: string]: string } {
    const convertedToArray = Object.entries(Color.colorsMap);
    const filteredArray = convertedToArray.filter(([key]) => !this.colorsUsed.includes(key));
    return Object.fromEntries(filteredArray);
  }
}
