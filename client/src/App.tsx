import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/portal/Layout";
import Home from "@/pages/portal/Home";
import Budget from "@/pages/portal/Budget";
import CapsGuide from "@/pages/portal/CapsGuide";
import ModulePage from "@/pages/portal/ModulePage";
import Methodology from "@/pages/portal/Methodology";
const RapsMap = lazy(() => import("@/pages/portal/RapsMap"));
const Admin = lazy(() => import("@/pages/portal/Admin"));
import Detail from "@/pages/portal/Detail";
import Search from "@/pages/portal/Search";
import { modules } from "@shared/portal";
import { Empty } from "@/components/portal/Common";
export default function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <Layout>
        <Suspense
          fallback={<div className="loading-line">Carregando módulo...</div>}
        >
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dados-orcamento" component={Budget} />
            <Route path="/mapa-raps" component={RapsMap} />
            <Route path="/guia-caps" component={CapsGuide} />
            <Route path="/guia-caps/:slug" component={CapsGuide} />
            <Route path="/metodologia" component={Methodology} />
            <Route path="/admin" component={Admin} />
            <Route path="/registro/:id" component={Detail} />
            <Route path="/busca" component={Search} />
            {modules
              .filter(m => !["budget", "services"].includes(m.key))
              .map(m => (
                <Route key={m.key} path={m.path}>
                  <ModulePage module={m.key} />
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
    </ErrorBoundary>
  );
}
