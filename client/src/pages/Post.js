import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  //Get the 'id' parameter from the URL using useParams
  let { id } = useParams();

  //Create a state variable to store the post data
  const [postObject, setPostObject] = useState({});

  //Fetch the post data when the component loads  or when the 'id' change
  useEffect(() => {
    //Make a get request to the backend to fetch the post by its ID
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      //save the response data /the post details ) in the state
      setPostObject(response.data);
    });
  }, [id]); //'id' is a dependency, so this will run whenever 'id' changes

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
}

export default Post;
