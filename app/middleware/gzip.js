'use strict';

const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
  return async function gzip(ctx, next) {
    await next();
    // 后续中间间执行完成后将响应体转换成gzip
    let body = ctx.body;
    if (!body) return;
    if (isJSON(body)) body = JSON.stringify(body);
    // 设置gzip body，修改响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};
