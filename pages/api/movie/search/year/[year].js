import clientPromise from "../../../../../lib/mongodb";
/**
* @swagger
* /api/search/year:
*   get:
*       description: Returns movies
*       responses:
*           200:
*               description: Hello Movies
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { year } = req.query;
    const movies = await db.collection("movies").find({year: parseInt(year)}).toArray();
    res.json({ status: 200, data: movies });
    }
