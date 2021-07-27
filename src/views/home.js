import { useHistory } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  let history = useHistory();

  return (
    <div className="home">
      <div className="container">
        <div className="welcome">Welcome' </div>
        <div className="user-name">{localStorage.getItem("user_name")}</div>
        <div className="message">You have Successfully Logged In </div>
      </div>
      <button onClick={() => history.push("/")} className="logout">
        Logout
      </button>
    </div>
  );
};

export default Home;
