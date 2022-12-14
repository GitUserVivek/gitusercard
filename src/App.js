import { Box, Container, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [Username, setUsername] = useState("");
  const [err404, setError404] = useState(false);
  const url = "https://api.github.com/users/";
  return (
    <div className="App">
      <Container height="100vh" display="flex" justifyContent="space-between" alignItems="center">
        <Box shadow="lg" className="mainApp" display="flex" justifyContent="space-between" alignItems="center">
          <input
            type="text"
            autoFocus={true}
            value={Username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                axios
                  .get(`${url}${Username.trim()}`)
                  .then((data) => {
                    data = data.data;
                    let date = new Date(data.created_at);
                    let createdAt = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
                    data.created_at = createdAt;
                    setUser(data);
                    setUsername("");
                  })
                  .catch((err) => {
                    if (err.response.status === 404) {
                      setError404(true);
                      setUser({});
                    }
                  });
              }
            }}
            placeholder="Enter Github Username"
            className="InputBox"
          />
          <Box height="fit-content" width="25rem" backgroundColor={"white"} margin="3" padding="3" borderRadius="md">
            {Object.keys(user).length === 0 ? (
              <>
                <SkeletonCircle height="100px" width="100px " />
                &nbsp; &nbsp; {!err404 && <b>Please Enter Username</b>}
                &nbsp; &nbsp; {err404 && <b style={{ color: "red" }}>User Not Found</b>}
                <Skeleton height="30px" margin={3} />
                <Skeleton height="30px" margin={3} />
                <Skeleton height="30px" margin={3} />
                <Skeleton height="30px" margin={3} />
                <Skeleton height="30px" margin={3} />
              </>
            ) : (
              <Box display="flex" flexDirection="column">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${user.avatar_url}) `,
                  }}
                />

                <div className="data">
                  <span>Username : {user.login || "null"}</span>
                  <span>Name : {user.name || "null"}</span>
                  <span>No. of public repos : {user.public_repos}</span>
                  <span>No. of public gists : {user.public_gists}</span>
                  <span>created at : {user.created_at || "null"}</span>
                  <span>
                    Visit Proofile :{" "}
                    <a href={user.html_url} target="blank">
                      {user.login}
                    </a>
                  </span>
                </div>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
