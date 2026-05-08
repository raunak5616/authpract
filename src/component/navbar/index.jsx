import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-2xl font-bold text-indigo-600">
                        AuthPract
                    </h1>
                    <div className="hidden md:flex gap-6">
                        <a
                            href="/"
                            className="text-slate-700 hover:text-indigo-600 transition"
                        >
                            Home
                        </a>
                        <a
                            href="/signup"
                            className="text-slate-700 hover:text-indigo-600 transition"
                        >
                            Signup
                        </a>
                    </div>
                    {/*Hamburger*/}
                    <button className="md:hidden text-3xl"
                        onClick={() => setOpen(!isOpen)}>
                        ☰
                    </button>
                </div>
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                            ? "max-h-40 opacity-100 py-4"
                            : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="flex flex-col gap-4">
                        <a
                           onClick={()=>('/')}
                            className="text-slate-700 hover:text-indigo-600 transition"
                        >
                            Home
                        </a>
                        <a
                            onClick={()=>navigate('/signup')}
                            className="text-slate-700 hover:text-indigo-600 transition"
                        >
                            Signup
                        </a>

                    </div>
                </div>
            </div>
        </nav>
    )
}