import sqlite3

DB = 'messages.db'


def init_db():
    conn = sqlite3.connect(DB)
    with open('schema.sql') as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()


def get_messages(offset=0, limit=10):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute(
        'SELECT id, content, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
        (limit, offset)
    )
    rows = cur.fetchall()
    conn.close()
    return [{'id': r[0], 'content': r[1], 'created_at': r[2]} for r in rows]


def add_message(content):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute('INSERT INTO messages (content) VALUES (?)', (content,))
    conn.commit()
    conn.close()