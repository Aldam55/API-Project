// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/SpotsPage";
import SingleSpotPage from "./components/SingleSpotPage";
import SpotReviewPage from "./components/SpotReviewPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            Home Test
            <SpotsPage></SpotsPage>
          </Route>
          <Route path='/spots/:spotId/reviews'>
            Spot Review Test
            <SpotReviewPage></SpotReviewPage>
          </Route>
          <Route path='/spots/:spotId'>
            Single Spot Test
            <SingleSpotPage></SingleSpotPage>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
