import React, { Component } from 'react';

class Header extends Component {

    handleLogout(){
        localStorage.clear()
        window.location.reload()
    }

    render() {
        return (
            <div>
                header
                <button className='btn btn-sm btn-danger' onClick={()=>this.handleLogout()}>
                    Logout
                </button>
            </div>
        );
    }
}

export default Header;