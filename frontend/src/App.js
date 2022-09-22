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
import CurrentUserSpotsPage from "./components/CurrentUserSpotsPage";
import CurrentUserReviewsPage from "./components/CurrentUserReviewsPage";
import AddSpotFormPage from "./components/AddSpotFormPage";
import UpdateSpotFormPage from "./components/UpdateSpotFormPage";

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
            <SpotsPage></SpotsPage>
          </Route>
          <Route path='/spots/:spotId/reviews'>
            Spot Review Test
            <SpotReviewPage></SpotReviewPage>
          </Route>
          <Route path='/spots/:spotId/edit'>
            <UpdateSpotFormPage></UpdateSpotFormPage>
          </Route>
          <Route path='/reviews/current'>
            <CurrentUserReviewsPage></CurrentUserReviewsPage>
          </Route>
          <Route path='/spots/current'>
            <CurrentUserSpotsPage></CurrentUserSpotsPage>
          </Route>
          <Route path='/spots/create'>
            <AddSpotFormPage></AddSpotFormPage>
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpotPage></SingleSpotPage>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
