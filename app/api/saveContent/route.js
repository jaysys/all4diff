// app/api/saveContent/route.js
import db from "./db";

export async function POST(req) {
  return new Promise((resolve) => {
    req.json().then(({ data }) => {
      db.run("INSERT INTO content (data) VALUES (?)", [data], function (err) {
        if (err) {
          resolve(
            new Response(JSON.stringify({ error: "Failed to save content" }), {
              status: 500,
            })
          );
          return;
        }

        // Respond with the id of the inserted row
        resolve(
          new Response(JSON.stringify({ id: this.lastID }), { status: 200 })
        );
      });
    });
  });
}

export async function GET() {
  return new Promise((resolve) => {
    db.all("SELECT id, data FROM content ORDER BY id DESC", [], (err, rows) => {
      if (err) {
        resolve(
          new Response(
            JSON.stringify({ error: "Failed to retrieve content" }),
            { status: 500 }
          )
        );
        return;
      }

      resolve(new Response(JSON.stringify(rows), { status: 200 }));
    });
  });
}
