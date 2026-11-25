import { NavLink, Link } from "react-router-dom";
import { FileText } from "lucide-react";

const navLinks = [
    {name: 'Home', link: '/'},
    {name: 'About', link: '/about'},
    {name: 'Contact', link: '/contact'},
    {name: 'Pricing', link: '/pricing'},
]

const NavBar = () => {
    return(
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-linear-to-br from-blue-600 to-purple-600 p-2 rounded-lg group-hover:shadow-lg transition-shado">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-semibold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Resume Analyzer Pro
                        </span>
                    </Link>
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <li key={i}>
                                <NavLink to={link.link} className="hover:bg-linear-to-r from-blue-600 to-purple-600 hover:text-white px-1"> {link.name}</NavLink>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </nav>

    )
}
export default NavBar