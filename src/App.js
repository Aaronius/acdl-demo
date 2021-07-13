import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const clearVars = () => {
  window.adobeDataLayer.push({
    page: undefined,
    siteSection: undefined,
    country: undefined,
    campaignId: undefined,
    animal: undefined
  })
}

// You can think of these components as "pages"
// in your app.

function Home() {
  useEffect(() => {
    clearVars();

    const urlSearchParams = new URLSearchParams(window.location.search);
    window.adobeDataLayer.push({
      page: "Home",
      siteSection: "none",
      country: "Russia",
      campaignId: urlSearchParams.get("campaignId")
    });
  }, []);

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

const onPreferenceClick = () => {
  window.adobeDataLayer.push({
    event: "preferenceIndicated",
    animal: "dinosaur"
  });
}

function About() {
  useEffect(() => {
    clearVars();
    window.adobeDataLayer.push({
      event: "viewLoad",
      page: "About",
      siteSection: "Info",
      country: "England"
    });
  }, []);

  return (
    <div>
      <h2>About</h2>
      <button onClick={onPreferenceClick}>
        I like dinosaurs.
      </button>
    </div>
  );
}

function Dashboard() {
  useEffect(() => {
    clearVars();
    window.adobeDataLayer.push({
      event: "viewLoad",
      page: "Dashboard",
      siteSection: "Business",
      country: "Germany"
    });
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
