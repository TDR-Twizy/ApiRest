import clientPromise from "../../../../../lib/mongodb";
/**
* @swagger
* /api/search/title:
*   get:
*       description: Returns movies
*       responses:
*           200:
*               description: Hello Movies
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { title } = req.query
    const movies = await db.collection("movies").find({title: title}).toArray();
    res.json({ status: 200, data: movies });
    }
