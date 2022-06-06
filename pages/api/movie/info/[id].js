import clientPromise from "../../../../lib/mongodb";
/**
* @swagger
* /api/movies:
*   get:
*       description: Returns movies
*       responses:
*           200:
*               description: Hello Movies
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { id } = req.query
    const movies = await db.collection("movies").find({_identifiant: parseInt(id)}).toArray();
    res.json({ status: 200, data: movies  });
    }
