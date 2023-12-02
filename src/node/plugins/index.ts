import { esbuildTransformPlugin } from "./esbuild";
import { importAnalysisPlugin } from "./importAnalysis";
import { resolvePlugin } from "./resolve";
import { cssPlugin } from "./css";
import { assetPlugin } from "./assets";
import { Plugin } from "../plugin";

export function resolvePlugins(): Plugin[] {
  return [
    resolvePlugin(),
    esbuildTransformPlugin(),
    importAnalysisPlugin(),
    cssPlugin(),
    assetPlugin(),
  ];
}
