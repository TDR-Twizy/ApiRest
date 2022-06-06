import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
// File: my-nextjs-project/pages/api/movie/comment/addComment.js
/**
*@swagger
* /api/movie/comment/addComment:
*   post:
*     requestBody:
*       description: Endpoint for adding an comment from a user on a specific movie.
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             required:
*               - name
*               - movie_id
*               - email
*               - text
*             properties:
*               name:
*                 type: string
*                 description: user name
*               email:
*                 type: string
*                 description: user email
*               movie_id:
*                 type: string
*                 description: movie identity
*               text:
*                 type: string
*                 description: comment to post
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

      const movies = await db.collection("movies")
      .find({_id : movie_id}).toArray();
      
      if (movies.length == 0){
        res.json({ status: 404, data: {message: "Error movie not found"} });
        return;
      }

      await db.collection("comments").insert(
        {  
          name:bodyParams.name,
          movie_id:movie_id, 
          email: bodyParams.email, 
          text: bodyParams.text,
          date: new Date() 
        }
      )

      res.json({ status: 200, data: {message: "Success"} });
    }
        
    else {   
      res.json({ status: 400, data: {message: "Error empty body parameters"} }); 
    }
}
    