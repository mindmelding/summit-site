// The page's files live at the repo root; the public URL is under /summit/.
// Strip that prefix and hand the request to the static assets.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/summit') {
      url.pathname = '/summit/';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname.startsWith('/summit/')) {
      url.pathname = url.pathname.slice('/summit'.length);
    }
    return env.ASSETS.fetch(new Request(url, request));
  },
};
