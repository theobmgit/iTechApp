import React from "react";

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark" style={{marginBottom: 20}}>
                <div className="container">
                    <a href="/" className="navbar-brand">
                        <i className="fas fa-sitemap" style={{marginRight: 10, fontSize: 25}}/>
                        iTech
                    </a>

                </div>
            </nav>
        );
    }
}

export default NavBar;