// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies'
type Data = {
  message: string;
};
export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method != 'POST') {
    return res.status(404).json({ message: 'This method is not supported!' });
  }
  return new Promise((resolve, reject) => {
    req.headers.cookie = '';

    const handleLoginRes: ProxyResCallback = (proxyRes, req, proxyResponse) => {
      let body = '';
      proxyRes.on('data', function (chunk) {
        body += chunk;
      });

      proxyRes.on('end', function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);

          //convert token to cookies
          const cookies = new Cookies(req, proxyResponse,{secure:process.env.NODE_ENV!== 'development'});
          cookies.set('access_token',accessToken,{
            httpOnly:true,
            sameSite:'lax',
            expires:new Date(expiredAt)
          });

          (proxyResponse as NextApiResponse).status(200).json({ message: 'login successfully' });
        } catch (e) {
          (proxyResponse as NextApiResponse).status(500).json({ message: 'something went wrong' });
        }
      });
    };

    proxy.once('proxyRes', handleLoginRes);
    proxy.once('error',(err)=>{
      reject(err)
    })

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });

  // res.status(200).json({ name: 'Get all paths of product' })
}
