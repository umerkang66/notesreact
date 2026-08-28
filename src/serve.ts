import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
): Promise<void> => {
  const app = express();

  app.use('/cells', createCellsRouter(filename, dir));

  if (useProxy) {
    // DEVELOPMENT
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // PRODUCTION
    const packagePath = path.resolve(__dirname, '../client/build');
    app.use(express.static(packagePath));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
