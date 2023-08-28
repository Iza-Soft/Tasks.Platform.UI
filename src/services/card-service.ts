import { RgbaColor } from "../models/RgbColor";

export class CardService {
  public CalculateHexToRgb(hex: string): RgbaColor {
    var bigint = parseInt(hex, 16);

    let rgba: RgbaColor = {
      Red: (bigint >> 16) & 255,
      Green: (bigint >> 8) & 255,
      Black: bigint & 255,
      Alpha: 1,
    };

    return rgba;
  }
}
