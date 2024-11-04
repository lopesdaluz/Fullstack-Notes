import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        alert(response.data);
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              {value.username}
              <button
                onClick={() => {
                  likeAPost(value.id);
                }}
              >
                Like
              </button>
              <lable>{value.Likes.length}</lable>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
