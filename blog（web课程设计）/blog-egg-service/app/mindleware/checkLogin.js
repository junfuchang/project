// module.exports = options => {
//   return async function checkLogin(ctx, next) {
//     console.log(ctx.session.openId);
//     if (ctx.session.openId) {
//       await next();
//     } else {
//       ctx.body = "没有登录";
//     }
//   };
// };
