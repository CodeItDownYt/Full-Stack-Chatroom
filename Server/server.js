const express = require("express");
const http = require("http");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    image TEXT
  )`);

	db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    roomId INTEGER,
    userId INTEGER,
    message TEXT,
    FOREIGN KEY (roomId) REFERENCES rooms(id)
  )`);
});

app.use(express.json());
app.use(cors());

app.post("/api/rooms", (req, res) => {
	const { title, description, image } = req.body;
	db.run(
		"INSERT INTO rooms (title, description, image) VALUES (?, ?, ?)",
		[title, description, image],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			const newRoom = {
				id: this.lastID,
				title,
				description,
				image,
			};
			io.emit("newRoom", newRoom);
			res.json(newRoom);
		}
	);
});

app.get("/api/rooms", (req, res) => {
	db.all("SELECT * FROM rooms", [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

app.get("/api/rooms/:roomId", (req, res) => {
	const roomId = req.params.roomId;
	db.get("SELECT title FROM rooms WHERE id = ?", [roomId], (err, row) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!row) {
			return res.status(404).json({ error: "Room not found" });
		}
		res.json(row);
	});
});

app.get("/api/rooms/:roomId/messages", (req, res) => {
	const roomId = req.params.roomId;
	db.all("SELECT * FROM messages WHERE roomId = ?", [roomId], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

io.on("connection", (socket) => {
	socket.on("join", (roomId) => {
		socket.join(roomId);
	});

	socket.on("message", (data) => {
		const { roomId, userId, message } = data;
		db.run(
			"INSERT INTO messages (roomId, userId, message) VALUES (?, ?, ?)",
			[roomId, userId, message],
			function (err) {
				if (err) {
					console.error(err.message);
				} else {
					io.to(roomId).emit("message", { roomId, userId, message });
				}
			}
		);
	});

	socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
