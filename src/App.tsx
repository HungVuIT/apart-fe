import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoutes from "./router/PrivateRoutes";
import PublishRoutes from "./router/PublishRoutes";
function App() {
  return (
    <Router>
      <div className="App">
        <PublishRoutes />
        <PrivateRoutes />
      </div>
    </Router>
  );
}

export default App;
