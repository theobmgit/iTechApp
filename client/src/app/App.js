import '../common/resources/css/App.css';
import NavBar from "../common/components/NavBar";
import {TableSelect, TableView, InputForm, ColumnSelect} from "../common/views/";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/"><TableSelect/></Route>
                <Route exact path="/api/query/:tableName"><TableView/></Route>
                <Route exact path="/api/query/:tableName/select"><ColumnSelect/></Route>
                <Route exact path="/api/query/:tableName/input"><InputForm/></Route>
            </Switch>
        </Router>
    );
}

export default App;
