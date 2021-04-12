import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ArticleListing from "./ArticleListing";
import ArticleView from "./ArticleView";
import { useEffect } from "react";
import KontentSmartLink from "@kentico/kontent-smart-link";
import "@kentico/kontent-smart-link/dist/kontent-smart-link.styles.css";

function App() {
  useEffect(() => {
    KontentSmartLink.initializeOnLoad({
      projectId: process.env.REACT_APP_PROJECT_ID,
      languageCodename: "default",
      queryParam: "preview",
    });
  }, []);

  return (
    <div className="App">
      <h1 className="title is-2">Welcome to my site</h1>
      <Router>
        <div>
          <div className="subtitle is-4">
            Don't forget to check articles in the{" "}
            <Link to={"/articles"}>Articles section</Link>
          </div>
          <Route exact path="/articles" component={ArticleListing} />
          <Route path="/article/:slug" component={ArticleView} />
        </div>
      </Router>
    </div>
  );
}

export default App;
