import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/Auth/ResetPassword";
import ChangePassword from "./components/Auth/ChangePassword";
import Employees from "./pages/Employees";
import Help from "./pages/Help";
import MySurveys from "./pages/MySurveys";
import NewSurvey from "./pages/NewSurvey";
import Settings from "./pages/Settings";
import Synthesis from "./pages/Synthesis";
import MyAccount from "./pages/MyAccount";
import { AuthProvider } from "./authContext";
import ProtectedRoute from "./ProtectedRoute";
import ServeyQuestions from "./components/servey-questions/ServeyQuestions";
import SendSurveyMails from "./components/Surveys/SendSurveyMails";
import { SurveyProvider } from "./surveyContext";
import AnswerDetails from "./pages/AnswerDetails";
import SurveyQuestionPage from "./pages/SurveyQuestionPage";
import SurveyEnd from "./pages/SurveyEnd";
import { CompanyProvider } from "./services/CompanyContext"; // Ensure this path is correct
import { UserProvider } from "./services/UserContext"; // Ensure this path is correct

const App = () => {
  return (
    <AuthProvider>
      <SurveyProvider>
        <CompanyProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/admin/reset-new-password/:token"
                  element={<ChangePassword />}
                />
                <Route path="/send-survey-mails" element={<SendSurveyMails />} />
                <Route path="/onboarding" element={<Onboarding />} />
                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute element={Dashboard} />}
                />
                <Route
                  path="/surveys"
                  element={<ProtectedRoute element={MySurveys} />}
                />
                <Route
                  path="/new-survey"
                  element={<ProtectedRoute element={NewSurvey} />}
                />
                <Route
                  path="/settings"
                  element={<ProtectedRoute element={Settings} />}
                />
                <Route
                  path="/synthesis"
                  element={<ProtectedRoute element={Synthesis} />}
                />
                <Route
                  path="/my-account"
                  element={<ProtectedRoute element={MyAccount} />}
                />
                <Route path="/help" element={<ProtectedRoute element={Help} />} />
                <Route
                  path="/employees"
                  element={<ProtectedRoute element={Employees} />}
                />

                <Route
                  path="/surveys/:adminId/:surveyId/:surveySendId/:employeeId/:token"
                  element={<ProtectedRoute element={SurveyQuestionPage} />}
                />

                <Route
                  path="/surveys/:surveyId/:surveySendId/:employeeId/:token"
                  element={<ProtectedRoute element={ServeyQuestions} />}
                />

                <Route
                  path="/answer-details/:surveySendId"
                  element={<ProtectedRoute element={AnswerDetails} />}
                />
                <Route
                  path="/survey-end"
                  element={<ProtectedRoute element={SurveyEnd} />}
                />
                {/* Non-protected routes can still be added individually */}
                {/* ... */}
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </CompanyProvider>
      </SurveyProvider>
    </AuthProvider>
  );
};

export default App;
