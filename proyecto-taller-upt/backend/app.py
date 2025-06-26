from wsgiref.simple_server import make_server
from urllib.parse import parse_qs
import json
import db

# Inicializar la base de datos
db.init_db()

def app(environ, start_response):
    path = environ.get('PATH_INFO', '')
    method = environ.get('REQUEST_METHOD', '')

    if path == '/messages' and method == 'GET':
        msgs = db.get_messages()
        body = json.dumps(msgs).encode('utf-8')
        start_response('200 OK', [('Content-Type', 'application/json')])
        return [body]

    if path == '/messages' and method == 'POST':
        try:
            size = int(environ.get('CONTENT_LENGTH', 0))
            raw = environ['wsgi.input'].read(size).decode('utf-8')
            data = json.loads(raw)
            content = data.get('content', '')
            db.add_message(content)
            start_response('201 Created', [('Content-Type', 'application/json')])
            return [b'{"status":"ok"}']
        except Exception:
            start_response('400 Bad Request', [('Content-Type', 'application/json')])
            return [b'{"status":"error"}']

    start_response('404 Not Found', [('Content-Type', 'text/plain')])
    return [b'Not found']

if __name__ == '__main__':
    print("Listening on http://0.0.0.0:5000...")
    server = make_server('0.0.0.0', 5000, app)
    server.serve_forever()
