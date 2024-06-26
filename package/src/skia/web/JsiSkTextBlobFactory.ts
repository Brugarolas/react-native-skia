import type { CanvasKit } from "canvaskit-wasm";

import type { SkFont } from "../types";
import type { TextBlobFactory } from "../types/TextBlob";
import type { SkRSXform } from "../types/RSXform";

import { Host } from "./Host";
import { JsiSkFont } from "./JsiSkFont";
import { JsiSkTextBlob } from "./JsiSkTextBlob";
import { JsiSkRSXform } from "./JsiSkRSXform";

export class JsiSkTextBlobFactory extends Host implements TextBlobFactory {
  constructor(CanvasKit: CanvasKit) {
    super(CanvasKit);
  }

  MakeFromText(str: string, font: SkFont) {
    return new JsiSkTextBlob(
      this.CanvasKit,
      this.CanvasKit.TextBlob.MakeFromText(str, JsiSkFont.fromValue(font))
    );
  }

  MakeFromGlyphs(glyphs: number[], font: SkFont) {
    return new JsiSkTextBlob(
      this.CanvasKit,
      this.CanvasKit.TextBlob.MakeFromGlyphs(glyphs, JsiSkFont.fromValue(font))
    );
  }

  MakeFromRSXform(str: string, rsxforms: SkRSXform[], font: SkFont) {
    return new JsiSkTextBlob(
      this.CanvasKit,
      this.CanvasKit.TextBlob.MakeFromRSXform(
        str,
        rsxforms.map((f) => Array.from(JsiSkRSXform.fromValue(f))).flat(),
        JsiSkFont.fromValue(font)
      )
    );
  }

  MakeFromRSXformGlyphs(glyphs: number[], rsxforms: SkRSXform[], font: SkFont) {
    const transforms = rsxforms.flatMap((s) =>
      Array.from(JsiSkRSXform.fromValue(s))
    );
    return new JsiSkTextBlob(
      this.CanvasKit,
      this.CanvasKit.TextBlob.MakeFromRSXformGlyphs(
        glyphs,
        transforms,
        JsiSkFont.fromValue(font)
      )
    );
  }
}
