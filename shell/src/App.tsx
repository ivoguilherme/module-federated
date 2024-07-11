import { Suspense } from "react";
import ModuleLoader from "./components/ModuleLoader";

function App() {
  return (
    <div>
      <h1>App Shell</h1>
      <Suspense fallback={<div>Carregando Menu...</div>}>
        <ModuleLoader
          scope="menu"
          module="./Menu"
          url="http://localhost:3002/menuRemoteEntry.js"
        />
      </Suspense>
    </div>
  );
}

export default App;
