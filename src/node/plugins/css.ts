import { readFile } from "fs-extra";

import { CLIENT_PUBLIC_PATH } from "../constants";
import { Plugin } from "../plugin";
import { ServerContext } from "../server";
import { getShortName } from "../utils";

export function cssPlugin(): Plugin {
  let serverContext: ServerContext;
  return {
    name: "m-vite:css",
    configureServer(s) {
      serverContext = s;
    },
    load(id) {
      // 加载
      if (id.endsWith(".css")) {
        return readFile(id, "utf-8");
      }
    },
    // 转换逻辑
    async transform(code, id) {
      if (id.endsWith(".css")) {
        // 包装成 JS 模块
        const jsContent = `
const css = \`${code.replace(/\n/g, "")}\`;
const style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = css;
document.head.appendChild(style);
export default css;
`.trim();
        return {
          code: jsContent,
        };
      }
      return null;
    },
  };
}
