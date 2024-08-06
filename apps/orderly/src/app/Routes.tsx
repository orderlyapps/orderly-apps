import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import { Route, Redirect } from "react-router";
import HomePage from "../components/pages/home/HomePage";
import { PATHS } from "../util/paths";
import { lazy, Suspense } from "react"; 
const CreateCongregationPage = lazy(() => import("../components/pages/settings/CreateCongregationPage")); 
const TestingPage = lazy(() => import("../components/pages/home/TestingPage"));
const OutlinesListPage = lazy(
  () => import("../components/pages/home/OutlinesListPage")
);
const PublishersListPage = lazy(
  () => import("../components/pages/home/PublishersListPage")
);
const ProfilePage = lazy(
  () => import("../components/pages/settings/ProfilePage")
);
const SettingsPage = lazy(
  () => import("../components/pages/settings/SettingsPage")
);
export function Routes({}) {
  return (
    <IonRouterOutlet>
      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route exact path="/settings">
        <Suspense fallback={<IonSpinner />}>
          <SettingsPage />
        </Suspense>
      </Route>

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route exact path={PATHS.outlines_list}>
        <Suspense fallback={<IonSpinner />}>
          <OutlinesListPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.profile}>
        <Suspense fallback={<IonSpinner />}>
          <ProfilePage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.publishers_list}>
        <Suspense fallback={<IonSpinner />}>
          <PublishersListPage />
        </Suspense>
      </Route>

      <Route exact path={ PATHS.testing }>
        <Suspense fallback={<IonSpinner />}>
          <TestingPage />
        </Suspense>
      </Route>

      <Route exact path={ PATHS.create_congregation }>
        <Suspense fallback={<IonSpinner />}>
          <CreateCongregationPage />
        </Suspense>
      </Route>
    </IonRouterOutlet>
  );
}
