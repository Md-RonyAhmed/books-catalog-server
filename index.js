const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${
	process.env.DB_PASS
}@tech-net.wrygwyk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const run = async () => {
	try {
		const db = client.db("booksDB");
		console.log("DB connection established");
		const booksCollection = db.collection("books");
		const userCollection = db.collection("users");

		app.get("/books", async (req, res) => {
			const cursor = booksCollection.find({});
			const books = await cursor.toArray();

			res.send({ status: true, data: books });
		});

		app.post("/book", async (req, res) => {
			const book = req.body;

			const result = await booksCollection.insertOne(book);

			res.send(result);
		});

		app.get("/book/:id", async (req, res) => {
			const id = req.params.id;

			const result = await booksCollection.findOne({
				_id: ObjectId(id),
			});

			res.send(result);
		});

		app.delete("/book/:id", async (req, res) => {
			const id = req.params.id;

			const result = await booksCollection.deleteOne({
				_id: ObjectId(id),
			});

			res.send(result);
		});

		app.post("/review/:id", async (req, res) => {
			const bookId = req.params.id;
			const review = req.body.review;

			const result = await booksCollection.updateOne(
				{ _id: ObjectId(bookId) },
				{ $push: { reviews: review } }
			);

			if (result.modifiedCount !== 1) {
				res.json({ error: "Book not found or review not added" });
				return;
			}

			res.json({ message: "Review added successfully!" });
		});

		app.get("/review/:id", async (req, res) => {
			const bookId = req.params.id;

			const result = await booksCollection.findOne(
				{ _id: ObjectId(bookId) },
				{ projection: { _id: 0, reviews: 1 } }
			);

			if (result) {
				res.json(result);
			} else {
				res.status(404).json({ error: "Book not found" });
			}
		});

		app.post("/user", async (req, res) => {
			const user = req.body;

			const result = await userCollection.insertOne(user);

			res.send(result);
		});

		app.get("/user/:email", async (req, res) => {
			const email = req.params.email;

			const result = await userCollection.findOne({ email });

			if (result?.email) {
				return res.send({ status: true, data: result });
			}

			res.status(404).json({ error: "User not found" });
		});
	} finally {
	}
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send("Welcome to Books Catalog server!");
});

app.listen(port, () => {
	console.log(`Books Catalog server listening on port ${port}`);
});
