import '../common/resources/css/App.css';
import NavBar from "../common/components/NavBar";
import {TableSelect, TableView} from "../common/views/";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
            <NavBar/>
                <Route path="/"><TableSelect/></Route>
                <Route path="/api/query/"><TableView/></Route>
        </Router>
    );
}

export default App;
