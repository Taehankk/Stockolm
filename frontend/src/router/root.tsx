import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const Loading = () => <div>Loading...</div>;

const Landing = lazy(() => import("../pages/LandingPage"));

const AnalystIndex = lazy(() => import("../pages/AnalystPage"));
const AnalystStatistic = lazy(() => import("../pages/AnalystPage/Statistic"));
const AnalystReport = lazy(() => import("../pages/AnalystPage/Report"));
const AnalystReportDetail = lazy(
  () => import("../pages/AnalystPage/ReportDetail")
);

const BoardDetail = lazy(() => import("../pages/BoardDetailPage"));

const CommunityIndex = lazy(() => import("../pages/CommunityPage"));
const Report = lazy(() => import("../pages/CommunityPage/Report"));
const Board = lazy(() => import("../pages/CommunityPage/Board"));

const ReportWrite = lazy(() => import("../pages/ReportWritePage"));
const BoardWrite = lazy(() => import("../pages/BoardWritePage"));

const AuthPage = lazy(() => import("../pages/AuthPage"));

const MyPageIndex = lazy(() => import("../pages/MyPage"));
const MyPageProfile = lazy(() =>  import("../pages/MyPage/Profile"));
const MyPagePassword = lazy(() => import("../pages/MyPage/Password"));

const Ranking = lazy(() => import("../pages/RankingPage"));
const Stock = lazy(() => import("../pages/StockPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Landing />
      </Suspense>
    ),
  },
  {
    path: "analyst/:nickname",
    element: (
      <Suspense fallback={<Loading />}>
        <AnalystIndex />
      </Suspense>
    ),
    children: [
      {
        path: "statistic",
        element: (
          <Suspense fallback={<Loading />}>
            <AnalystStatistic />
          </Suspense>
        ),
      },
      {
        path: "report",
        element: (
          <Suspense fallback={<Loading />}>
            <AnalystReport />
          </Suspense>
        ),
      },
      {
        path: "report/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <AnalystReportDetail />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate replace={true} to={"statistic"} />,
      },
    ],
  },
  {
    path: "community",
    element: (
      <Suspense fallback={<Loading />}>
        <CommunityIndex />
      </Suspense>
    ),
    children: [
      {
        path: "report",
        element: (
          <Suspense fallback={<Loading />}>
            <Report />
          </Suspense>
        ),
      },
      {
        path: "board",
        element: (
          <Suspense fallback={<Loading />}>
            <Board />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate replace={true} to={"report"} />,
      },
    ],
  },
  {
    path: "community/board/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <BoardDetail />
      </Suspense>
    ),
  },
  {
    path: "community/report/write",
    element: (
      <Suspense fallback={<Loading />}>
        <ReportWrite />
      </Suspense>
    ),
  },
  {
    path: "community/board/write",
    element: (
      <Suspense fallback={<Loading />}>
        <BoardWrite />
      </Suspense>
    ),
  },
  {
    path: "auth",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: "mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <MyPageIndex />
      </Suspense>
    ),
    children: [
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <MyPageProfile />
          </Suspense>
        ),
      },
      {
        path: "password",
        element: (
          <Suspense fallback={<Loading />}>
            <MyPagePassword />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate replace={true} to={"profile"} />,
      },
    ],
  },
  {
    path: "ranking",
    element: (
      <Suspense fallback={<Loading />}>
        <Ranking />
      </Suspense>
    ),
  },
  {
    path: "stock",
    element: (
      <Suspense fallback={<Loading />}>
        <Stock />
      </Suspense>
    ),
  },
]);

export default root;
