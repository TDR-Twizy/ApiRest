import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
// File: my-nextjs-project/pages/api/movie/favorites/addFavorites.js
/**
*@swagger
* /api/movie/favorites/addFavorites:
*   post:
*     requestBody:
*       description: Endpoint for adding an favorites from a user on a specific movie.
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             required:
*               - user_id
*               - movie_id
*             properties:
*               user_id:
*                 type: string
*                 description: user identity
*               movie_id:
*                 type: string
*                 description: movie identity
*     responses:
*       200:
*         description: Success Response
*       400:
*         description: Error Response
*/
export default async function handler(req, res) {
    
    const bodyParams = req.body;
    
    if (bodyParams) {
      const bodyParams = req.body;
      const client = await clientPromise;
      const db = client.db("sample_mflix");

      const movie_id = ObjectId(bodyParams.movie_id);
      const user_id = ObjectId(bodyParams.user_id);

      const movies = await db.collection("movies")
      .find({_id : movie_id}).toArray();
      
      if (movies.length == 0){
        res.json({ status: 404, data: {message: "Error movie not found"} });
        return;
      }

      const users = await db.collection("users")
      .find({_id : user_id}).toArray();
      
      if (users.length == 0){
        res.json({ status: 404, data: {message: "Error user not found"} });
        return;
      }

      await db.collection("favorites").insert(
        {  
          movie_id:movie_id, 
          user_id: user_id,
          date: new Date() 
        }
      )

      res.json({ status: 200, data: {message: "Success"} });
    }
        
    else {   
      res.json({ status: 400, data: {message: "Error empty body parameters"} }); 
    }
}
    