import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./context/contextApi";
import Header from "./components/Header";
import SearchResult from "./components/SearchResult";
import Feed from "./components/Feed";
import VideoDetails from "./components/VideoDetails";
import ChannelDetails from "./components/ChannelDetails";

function App() {
    return (
        <AppContext>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Feed />} />
                        <Route
                            exact
                            path="/searchResult/:searchQuery"
                            element={<SearchResult />}
                        />
                        <Route exact path="/video/:id" element={<VideoDetails />} />
                        <Route exact path="/channel/details/:id" element={<ChannelDetails />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AppContext>
    );
}

export default App;
