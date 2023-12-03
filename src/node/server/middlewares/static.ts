import { NextHandleFunction } from "connect";
import sirv from "sirv";

import { CLIENT_PUBLIC_PATH } from "../../constants";
import { isImportRequest } from "../../utils";

// 一个用于加载静态资源的中间件
export function staticMiddleware(root: string): NextHandleFunction {
  const serveFromRoot = sirv(root, { dev: true });
  return async (req, res, next) => {
    if (!req.url) {
      return;
    }
    // 不处理 import 请求
    if (isImportRequest(req.url) || req.url === CLIENT_PUBLIC_PATH) {
      return;
    }
    serveFromRoot(req, res, next);
  };
}
 