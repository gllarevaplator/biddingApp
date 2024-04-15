import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./features/app/store";
import Auctions from "./components/Auctions/AllAuctions/Auctions";
import NewAuction from "./components/Auctions/NewAuction/NewAuction";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import AuctionDetailsContainer from "./components/Auctions/AuctionDetails/AuctionDetailsContainer";

function App() {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: "1000px", margin: "0px auto" }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Auctions />} />
            <Route path="/new-auction" element={<NewAuction />} />
            <Route path="/product/:id" element={<AuctionDetailsContainer />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
