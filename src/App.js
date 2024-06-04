import {useEffect,  Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AOS from "aos";
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
const PageBilling = lazy(() => import("./pages/PageBilling"));
const HomeGetStarted = lazy(() => import("./pages/HomeGetStarted"));
const LoginRedirect = lazy(() => import("./pages/LoginRedirect"));
const Test = lazy(() => import("./pages/Test"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const PageAgreementCheckbox = lazy(() => import("./pages/PageAgreementCheckbox"));
const PageOrderSuccess = lazy(() => import("./pages/PageOrderSuccess"));
const PageOrderFailed = lazy(() => import("./pages/PageOrderFailed"));
const PageConsultingAgreement = lazy(() => import("./pages/PageConsultingAgreement"));
const PageSoftwareAsService = lazy(() => import("./pages/PageSoftwareAsService"));
const PageStartup = lazy(() => import("./pages/PageStartup"));
const PageReportMessage = lazy(() => import("./pages/PageReportMessage"));
const PageCheckout = lazy(() => import("./pages/PageCheckout"));
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
    
  }, [])
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavScrollTop>
          <Suspense fallback={<div />}>
            <Routes>
              <Route path={`${process.env.PUBLIC_URL + "/"}`} element={<HomeOne/>}/>
              <Route path={`${process.env.PUBLIC_URL + "/home-two"}`} element={<HomeTwo/>}/>
              <Route path={`${process.env.PUBLIC_URL + "/home-three"}`} element={<HomeThree/>}/>
              <Route path={`${process.env.PUBLIC_URL + "/about"}`} element={<About jwt={jwt} />} />
              <Route path={`${process.env.PUBLIC_URL + "/service"}`} element={<Service/>} />

              <Route path={`${process.env.PUBLIC_URL + "/work-details/:id"}`} element={<WorkDetails/>} />
              <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} element={<BlogGrid/>} />
              <Route path={`${process.env.PUBLIC_URL + "/blog-classic"}`} element={<BlogClassic/>} />
              <Route path={`${process.env.PUBLIC_URL + "/tag/:slug"}`} element={<BlogTag/>} />
              <Route path={`${process.env.PUBLIC_URL + "/category/:slug"}`} element={<BlogCategories/>} />
              <Route path={`${process.env.PUBLIC_URL + "/blog-details/:id"}`}element={<BlogDetails/>} />
              <Route path={`${process.env.PUBLIC_URL + "/contact"}`} element={<PageOrderSuccess jwt={jwt}/>} />
              <Route path={`${process.env.PUBLIC_URL + "/dashboard"}`} element={<HomeOne />} />
              <Route path={`${process.env.PUBLIC_URL + "/billings"}`} element={<PageBilling jwt={jwt} />} />
              <Route path={`${process.env.PUBLIC_URL + "/get-started"}`} element={<HomeGetStarted jwt={jwt} />} />
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
              <Route path={`${process.env.PUBLIC_URL + "/setup/missing"}`} element={<PageStartup jwt={jwt} title="UNANSWERED QUESTIONS" subtitle="You have not answered these questions. Please answer them to complete your AI training." pageTypes={["investor", "customer", "general"]} apipath="customer-answers/complete" />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/investor"}`} element={<PageStartup jwt={jwt} title="INVESTOR QUESTIONS" subtitle="These questions are those typically asked by investors to understand your venture." pageTypes={["investor"]} apipath="customer-answers/complete" />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/customer"}`} element={<PageStartup jwt={jwt} title="CUSTOMER QUESTIONS" subtitle="These questions are what early customers typically ask before making a purchase." pageTypes={["customer"]} apipath="customer-answers/complete" />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/customized"}`} element={<PageStartup jwt={jwt} title="CUSTOMIZED QUESTIONS" subtitle="Train your AI by adding these question-answer sets to enhance its knowledge." pageTypes={["customized"]} apipath="customer-answers/customized" />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/general"}`} element={<PageStartup jwt={jwt} title="GENERAL INFORMATION" subtitle="These details enable the AI's conversations to be more seamless and personalized." pageTypes={["general"]} apipath="customer-answers/general" />} />
              <Route path={`${process.env.PUBLIC_URL + "/ai"}`} element={<PageAi jwt={jwt} />} />

              <Route path={`${process.env.PUBLIC_URL + "/report/messages"}`} element={<PageReportMessage jwt={jwt} />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/chatbot"}`} element={<HomeGetStarted jwt={jwt} showBlockName="chatbot" />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/phone"}`} element={<HomeGetStarted jwt={jwt} showBlockName="phone" />} />
              <Route path={`${process.env.PUBLIC_URL + "/setup/qa"}`} element={<HomeGetStarted jwt={jwt} showBlockName="qa" />} />
              <Route path={`${process.env.PUBLIC_URL + "/checkout"}`} element={<PageCheckout jwt={jwt} />} />
            </Routes>
          </Suspense>
        </NavScrollTop>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
