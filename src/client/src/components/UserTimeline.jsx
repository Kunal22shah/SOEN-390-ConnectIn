import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserSession";
import axios from "axios";
import TimelineCSS from "../css/userTimeline.module.css";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import Navbar from "./Navbar";
import LoginFooter from "./LoginFooter";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const UserTimeline = () => {
  //Global state
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  const navigate = useNavigate();
  const [userConnections, setUserConnections] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    connections: [],
  });

  const fetchUserConnections = async () => {
    try {
      if (userID) {
        const response = await axios.get(
          `http://localhost:9000/users/profile/${userID}`
        );
        setUserConnections({
          _id: response.data._id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          connections: response.data.connections,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch session once
  useEffect(() => {
    fetchSession();
    fetchUserConnections();
    fetchConnections();
    //fetchConnectionPosts();
    fetchPosts();
  }, []);

  //Fetch session information
  const fetchSession = async () => {
    try {
      const response = await axios.get(`session`);
      setLogin({
        isLoggedIn: true,
      });
      sessionStorage.setItem("userID", response.data.user_info.user_id);
      sessionStorage.setItem("firstname", response.data.user_info.firstname);
      sessionStorage.setItem("lastname", response.data.user_info.lastname);
      sessionStorage.setItem("role", response.data.user_info.role);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [postData, setpostData] = useState({
    description: "",
    attachment: null,
    timestamp: new Date(),
  });

  //HTTP Request to fetch posts and add posts ....
  const savePost = async () => {
    axios
      .post(`http://localhost:9000/users/post`, {
        _id: sessionStorage.getItem("userID"),
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
        description: postData.description,
        timestamp: postData.timestamp,
      })
      .then((response) => {
        console.log(response.data);
        swal("Congrats!", "You have successfully created a post!", "success", {
          button: false,
          timer: 1000,
        });
        navigate("/userTimeline");
      })
      .then((response) => {
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      })
      .catch((error) => {
        console.log(error);
        swal("Failed", "Your post was not created, try again!", "error", {
          button: false,
          timer: 1000,
        });
      });
  };

  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    await axios
      .get(`http://localhost:9000/users/${userID}/connections`)
      .then((response) => {
        setConnections(response.data);
      });
  };

  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    await axios
      .get(`http://localhost:9000/users/${userID}/posts`)
      .then((response) => {
        setPosts(response.data);
      });
  };

  const userPosts = posts.map((post) => (
    <div className={TimelineCSS.userPostsTimeline}>
      <span className={TimelineCSS.subTitleTimeline}>
        {post.firstname} {post.lastname}
      </span>
      <p className={TimelineCSS.postText}>{post.description}</p>
    </div>
  ));

  //const allPosts = [...allConnectionsPosts, ...userPosts]
  const allSortedPosts = [...userPosts].sort((a, b) => {
    return a.timestamp > b.timestamp ? 1 : -1;
  });

  return (
    <div className={TimelineCSS.body}>
      <Navbar /> 
      {userID && login ? (
        <div className={TimelineCSS.userTimelineContainer}>
          {/* User Information Component */}
          <div className={TimelineCSS.leftTimeline}>
            <div className={TimelineCSS.userContainerTimeline}>
              <img
                src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                alt="default pic"
                style={{
                  height: 90,
                  width: 90,
                  display: "block",
                  margin: "auto",
                }}
              ></img>
            </div>

            <span className={TimelineCSS.userNameTimeline}>
              {sessionStorage.getItem("firstname")}{" "}
              {sessionStorage.getItem("lastname")}
            </span>
            <br></br>
            <span className={TimelineCSS.userNameTimeline}>
              <IconButton>
                <NotificationsNoneIcon></NotificationsNoneIcon>
              </IconButton>
            </span>
          </div>

          {/* User posts section*/}
          <div className={TimelineCSS.middleTimeline}>
            {/* Create a post section*/}
            <br></br>
            <div style={{ fontWeight: "bold", textAlign: "center" }}>
              Welcome to your timeline{" "}
            </div>
            <div className={TimelineCSS.writePost}>
              <TextField
                id="outlined-basic"
                label="Start A Post"
                variant="standard"
                className={TimelineCSS.postTextField}
                value={postData.description}
                onChange={(e) =>
                  setpostData({ ...postData, description: e.target.value })
                }
                style={{ marginLeft: "10px" }}
              />
              <IconButton style={{ marginTop: "10px" }}>
                <SendIcon onClick={savePost} fontSize="small"></SendIcon>
              </IconButton>
              <div
                className={TimelineCSS.timestamp}
                value={Date.now()}
                onChange={(e) =>
                  setpostData({ ...postData, timestamp: e.target.value })
                }
              />

              {/* <input className="imageFile" type="file" accept=".png" name="image" 
              onChange={e => setpostData({...postData, attachment: e.target.files[0]})}/> */}
            </div>
            {/* user's post in their timeline*/}

              {/* each div is a single post*/}

            {allSortedPosts}
          </div>
          <div className={TimelineCSS.contacts}>
            <span className={TimelineCSS.subTitle}>Contacts</span>
            <br></br>
            <div>
              {userConnections && userConnections.connections.length > 0 ? (
                userConnections.connections.map((connection) => {
                  return (
                    <l1 className={TimelineCSS.connectionsInfo}>
                      <img
                        src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                        alt="comapnyPic"
                        className={TimelineCSS.companyPic}
                      ></img>
                      <div>
                        <span className={TimelineCSS.connectionName}>
                          <Link
                            to={`/users/search/${connection.userID}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {connection.firstname} {connection.lastname}
                          </Link>
                        </span>
                      </div>
                    </l1>
                  );
                })
              ) : (
                <p className={TimelineCSS.userBio}>You do not have any connection</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
      <LoginFooter />
    </div>
  );
};

export default UserTimeline;
