// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/SpotsPage";
import SingleSpotPage from "./components/SingleSpotPage";
import CurrentUserSpotsPage from "./components/CurrentUserSpotsPage";
import CurrentUserReviewsPage from "./components/CurrentUserReviewsPage";
import AddSpotFormPage from "./components/AddSpotFormPage";
import UpdateSpotFormPage from "./components/UpdateSpotFormPage";
import AddReviewFormPage from "./components/AddReviewFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const reviews = useSelector(state => state.reviews.spot)
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
            <AddReviewFormPage></AddReviewFormPage>
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
            <SingleSpotPage reviews={reviews}></SingleSpotPage>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
