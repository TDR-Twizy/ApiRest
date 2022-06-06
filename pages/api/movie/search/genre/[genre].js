import clientPromise from "../../../../../lib/mongodb";
/**
* @swagger
* /api/movie/search/genre:
*   get:
*       description: Returns movies
*       responses:
*           200:
*               description: Hello Movies
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { genre } = req.query
    const movies = await db.collection("movies").find({genres: genre}).limit(5).toArray();
    res.json({ status: 200, data: movies });
    }
