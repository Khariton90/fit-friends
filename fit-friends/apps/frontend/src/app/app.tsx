import { Routes, Route } from "react-router-dom";
import { Approute } from "../consts";
import { CoachQuestionPage } from "../pages/coach-question-page/coach-question-page";
import { HomePage } from "../pages/home-page/home-page";
import { IntoPage } from "../pages/into-page/into-page";
import { SignInPage } from "../pages/sign-in-page/sign-in-page";
import { SignUpPage } from "../pages/sign-up-page/sign-up-page";
import { UserQuestionPage } from "../pages/user-question-page/user-question-page";

export function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path={Approute.Into} element={<IntoPage />} />
        <Route path={Approute.SignUp} element={<SignUpPage />} />
        <Route path={Approute.SignIn} element={<SignInPage />} />
        <Route path={Approute.CoachQuestion} element={<CoachQuestionPage />} />
        <Route path={Approute.UserQuestion} element={<UserQuestionPage />} />
        <Route path={Approute.Home} element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
