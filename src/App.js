import {useEffect,  Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import { initGA } from './analytics';
import RouteTracker from "./RouteTracker";

import NavScrollTop from './components/NavScrollTop';
import { useUserState } from './components/UserContext';

const HomeOne = lazy(() => import("./pages/HomeOne"));
const HomeTwo = lazy(() => import("./pages/HomeTwo"));
const HomeThree = lazy(() => import("./pages/HomeThree"));
const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Service"));
const WorkDetails = lazy(() => import("./pages/WorkDetails"));
const BlogGrid = lazy(() => import("./pages/BlogGrid"));
const BlogClassic = lazy(() => import("./pages/BlogClassic"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const BlogCategories = lazy(() => import("./pages/BlogCategories"));
const BlogTag = lazy(() => import("./pages/BlogTag"));
const LoginRedirect = lazy(() => import("./pages/LoginRedirect"));
const Test = lazy(() => import("./pages/Test"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const PageAgreementCheckbox = lazy(() => import("./pages/PageAgreementCheckbox"));
const PageOrderSuccess = lazy(() => import("./pages/PageOrderSuccess"));
const PageOrderFailed = lazy(() => import("./pages/PageOrderFailed"));
const PageConsultingAgreement = lazy(() => import("./pages/PageConsultingAgreement"));
const PageSoftwareAsService = lazy(() => import("./pages/PageSoftwareAsService"));
const PageAi = lazy(() => import("./pages/PageAi"));

function App() {
  const { jwt } = useUserState();

  useEffect(() => {
    AOS.init({
        offset: 80,
        duration: 1000,
        once: true,
        easing: 'ease',
    });
    AOS.refresh();
    
  }, []);

  useEffect(() => {
    initGA();
  }, []);

  return (
      <Router>
        <RouteTracker />
        <NavScrollTop>
          <Suspense fallback={<div />}>
            <Routes>
              <Route path={`${process.env.PUBLIC_URL + "/"}`} element={<HomeOne/>}/>
              <Route path={`${process.env.PUBLIC_URL + "/home-two"}`} element={<HomeTwo/>}/>
              <Route path={`${process.env.PUBLIC_URL + "/home-three"}`} element={<HomeThree/>}/>
              <Route path={`${process.env.PUBLIC_URL + "/about"}`} element={<About />} />
              <Route path={`${process.env.PUBLIC_URL + "/service"}`} element={<Service/>} />
              <Route path={`${process.env.PUBLIC_URL + "/ai/demo-tire-store"}`} element={<PageAi id="sub_1OsC08Ittz0L0oqPhlD01GMp" title="tire store" />} />

              <Route path={`${process.env.PUBLIC_URL + "/work-details/:id"}`} element={<WorkDetails/>} />
              <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} element={<BlogGrid/>} />
              <Route path={`${process.env.PUBLIC_URL + "/blog-classic"}`} element={<BlogClassic/>} />
              <Route path={`${process.env.PUBLIC_URL + "/tag/:slug"}`} element={<BlogTag/>} />
              <Route path={`${process.env.PUBLIC_URL + "/category/:slug"}`} element={<BlogCategories/>} />
              <Route path={`${process.env.PUBLIC_URL + "/blog-details/:id"}`}element={<BlogDetails/>} />
              <Route path={`${process.env.PUBLIC_URL + "/contact"}`} element={<PageOrderSuccess jwt={jwt}/>} />
              <Route path={`${process.env.PUBLIC_URL + "/dashboard"}`} element={<HomeOne />} />
              <Route path={`${process.env.PUBLIC_URL + "/connect/google/redirect"}`} element={<LoginRedirect providerName="google" />} />
              <Route path={`${process.env.PUBLIC_URL + "/connect/facebook/redirect"}`} element={<LoginRedirect providerName="facebook" />} />
              <Route path={`${process.env.PUBLIC_URL + "/connect/twitter/redirect"}`} element={<LoginRedirect providerName="twitter" />} />
              <Route path={`${process.env.PUBLIC_URL + "/test"}`} element={ <Test /> } />
              <Route path={`${process.env.PUBLIC_URL + "/privacy"}`} element={<Privacy />} />
              <Route path={`${process.env.PUBLIC_URL + "/consulting"}`} element={<PageConsultingAgreement />} />
              <Route path={`${process.env.PUBLIC_URL + "/saas"}`} element={<PageSoftwareAsService />} />
              <Route path={`${process.env.PUBLIC_URL + "/terms"}`} element={<Terms />} />
              <Route path={`${process.env.PUBLIC_URL + "/checkout/agreement/:id"}`} element={<PageAgreementCheckbox />} />
              <Route path={`${process.env.PUBLIC_URL + "/order-success/:id"}`} element={<PageOrderSuccess jwt={jwt} />} />
              <Route path={`${process.env.PUBLIC_URL + "/order-success"}`} element={<PageOrderSuccess jwt={jwt} />} />
              <Route path={`${process.env.PUBLIC_URL + "/order-failed"}`} element={<PageOrderFailed />} />
            </Routes>
          </Suspense>
        </NavScrollTop>
      </Router>
  );
}

export default App;
