import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/portal/Layout";
import Home from "@/pages/portal/Home";
import Budget from "@/pages/portal/Budget";
import CityData from "@/pages/portal/CityData";
import CapsGuide from "@/pages/portal/CapsGuide";
import ModulePage from "@/pages/portal/ModulePage";
import Methodology from "@/pages/portal/Methodology";
import Welcome from "@/pages/portal/Welcome";
import NormativeUpdates from "@/pages/portal/NormativeUpdates";
const RapsMap = lazy(() => import("@/pages/portal/RapsMap"));
const Admin = lazy(() => import("@/pages/portal/Admin"));
const CismArea = lazy(() => import("@/pages/portal/CismArea"));
const HealthPlan = lazy(() => import("@/pages/portal/HealthPlan"));
import Detail from "@/pages/portal/Detail";
import Search from "@/pages/portal/Search";
import { modules } from "@shared/portal";
import { Empty } from "@/components/portal/Common";

function PortalRoutes() {
  return (
    <Layout>
      <Suspense fallback={<div className="loading-line">Carregando módulo...</div>}>
        <Switch>
          <Route path="/inicio" component={Home} />
          <Route path="/dados-orcamento" component={Budget} />
          <Route path="/dados-da-cidade" component={CityData} />
          <Route path="/mapa-raps" component={RapsMap} />
          <Route path="/metas-saude" component={HealthPlan} />
          <Route path="/atualizacoes-normativas" component={NormativeUpdates} />
          <Route path="/guia-caps" component={CapsGuide} />
          <Route path="/guia-caps/:slug" component={CapsGuide} />
          <Route path="/metodologia" component={Methodology} />
          <Route path="/admin" component={Admin} />
          <Route path="/cism" component={CismArea} />
          <Route path="/registro/:id" component={Detail} />
          <Route path="/busca" component={Search} />
          {modules
            .filter(module => !["budget", "services"].includes(module.key))
            .map(module => (
              <Route key={module.key} path={module.path}>
                <ModulePage module={module.key} />
              </Route>
            ))}
          <Route>
            <div className="content-page">
              <Empty
                title="Página não encontrada"
                text="Utilize a navegação do observatório para encontrar um módulo."
              />
            </div>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <Suspense fallback={<div className="loading-line">Carregando módulo...</div>}>
        <Switch>
          <Route path="/" component={Welcome} />
          <Route>
            <PortalRoutes />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}
