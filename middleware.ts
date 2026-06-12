export const config = {
  // 这里写你要拦截的路径，假设你的简历页面是 /resume
  // 如果还有单独的 PDF 文件链接，可以用数组：matcher: ['/resume', '/resume.pdf']
  matcher: ['/hero/resume'],
};

export default function middleware(request: Request) {
  // 获取浏览器发来的 Authorization 头
  const authorizationHeader = request.headers.get('authorization');

  // 如果请求头带有密码，进行校验
  if (authorizationHeader) {
    // 提取 Basic Auth 的 Base64 字符串
    const authValue = authorizationHeader.split(' ')[1];
    
    // 从 Vercel 环境变量中读取我们预设的正确密钥
    const expectedAuth = process.env.RESUME_AUTH_SECRET;

    if (authValue === expectedAuth) {
      // 密码正确，放行，允许读取打包好的 Astro 静态页面
      return new Response(null, {
        headers: { 'x-middleware-next': '1' }
      });
    }
  }

  // 密码错误或未输入密码时，直接拦截，并强制浏览器弹出系统级密码框
  return new Response('需要密码才能访问此页面。', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}