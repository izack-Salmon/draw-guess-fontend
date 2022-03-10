import { NavLink } from "react-router-dom";

export function AppHeader() {

    return (
        <header className="App-header">
            <section className="header-cointiner">
                <h3 className='logo'>Draw &#38; Guess</h3>
                <nav>
                    <NavLink className={({ isActive }) => (isActive ? "my-active" : '')} exact='true' to='/'>Home</NavLink>
                </nav>
            </section>
        </header>
    )
}
