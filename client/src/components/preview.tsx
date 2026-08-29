import '../styles/preview.css';
import { FC, useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        html {
          background-color: white;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
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

  useEffect(() => {
    const iframe = iFrameRef.current;
    if (!iframe) return;

    iframe.srcdoc = html;

    const sendMessage = () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(code, '*');
      }
    };

    iframe.addEventListener('load', sendMessage);
    const timer = setTimeout(sendMessage, 50);

    return () => {
      iframe.removeEventListener('load', sendMessage);
      clearTimeout(timer);
    };
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
