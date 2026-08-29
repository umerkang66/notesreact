import '../styles/preview.css';
import { FC, useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const getHtml = (hasTailwind: boolean) => `
  <!DOCTYPE html>
  <html>
    <head>
      ${hasTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
      <style>
        html, body {
          background-color: white;
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.getElementById('root');
          if (root) {
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          }
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: FC<PreviewProps> = ({ code, err }) => {
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);
  const prevTailwindRef = useRef<boolean | null>(null);

  useEffect(() => {
    const iframe = iFrameRef.current;
    if (!iframe) return;

    const hasTailwind =
      code.includes('__has_tailwind__') ||
      code.includes('tailwindcss') ||
      code.includes('tailwind') ||
      code.includes('cdn.tailwindcss.com');

    const sendMessage = () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(code, '*');
      }
    };

    // Only reload the iframe document if tailwind requirement changed or initial mount
    if (prevTailwindRef.current !== hasTailwind) {
      prevTailwindRef.current = hasTailwind;
      iframe.srcdoc = getHtml(hasTailwind);

      iframe.addEventListener('load', sendMessage);
      const timer = setTimeout(sendMessage, 50);

      return () => {
        iframe.removeEventListener('load', sendMessage);
        clearTimeout(timer);
      };
    } else {
      // Warm iframe: instantly post message without wiping iframe DOM or reloading scripts
      sendMessage();
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        className="preview-iframe"
        ref={iFrameRef}
        title="code-preview"
        sandbox="allow-scripts"
      />
      {err && (
        <div className="preview-error">
          <div className="preview-error-header">
            <span>Build Error</span>
          </div>
          <div>{err}</div>
        </div>
      )}
    </div>
  );
};

export default Preview;
