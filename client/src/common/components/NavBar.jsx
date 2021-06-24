import React from "react";

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark" style={{marginBottom: 20}}>
                <div className="container">
                    <a href="/" className="navbar-brand">
                        <h1><i className="fas fa-sitemap" style={{marginRight: 10}}/>  iTech</h1>
                    </a>
                    <p style={{color: "white"}}><small>Technology Data Portal</small></p>
                </div>
            </nav>
        );
    }
}

export default NavBar;