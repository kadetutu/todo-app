import { NavLink, Link } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";

const Footer = () => {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <footer className="border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-linear-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            © 2026 ResumeAI. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer;