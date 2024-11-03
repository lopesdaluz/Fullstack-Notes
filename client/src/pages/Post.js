import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  //Get the 'id' parameter from the URL using useParams
  let { id } = useParams();

  //Create a state variable to store the post data
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  //Fetch the post data when the component loads  or when the 'id' change
  useEffect(() => {
    //Make a get request to the backend to fetch the post by its ID
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      //save the response data /the post details ) in the state
      setPostObject(response.data);
    });
  }, [id]); //'id' is a dependency, so this will run whenever 'id' changes

  //Fetch the post data when the component loads  or when the 'id' change
  useEffect(() => {
    //Make a get request to the backend to fetch the post by its ID
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      //save the response data /the post details ) in the state
      setComments(response.data);
    });
  }, [id]); //'id' is a dependency, so this will run whenever 'id' changes

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        alert("token deleted");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>
          <button onClick={addComment}> Add Comments</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
