import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: user.email,
                password: user.password
            };

            const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v2/login`;
            const response = await axios.post(endpoint, data);

            console.log(response);
            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.id)
                localStorage.setItem("companyId", response.data.companyId);
                // localStorage.getItem("userId")
                console.log("login user", response.data)
                navigate("/dashboard");
            } else {
                toast.error("Invalid email or password.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during sign-in.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="rounded-lg border bg-white shadow-sm text-card-foreground mx-auto w-full mx-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <form onSubmit={handleSubmit}>
                    <img
                        src="images/bsr-logo.png"
                        alt="BackstageRate Logo"
                        className="w-40 mr-auto ml-5 mt-6 -mb-2"
                    />
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">
                            Me connecter
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Accédez à votre compte BackstageRate.
                        </p>
                    </div>
                    <div className="p-6 pt-2">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="adresse@mail.com"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    required
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Mot de passe
                                    </label>
                                    <a
                                        href="/reset-password"
                                        className="ml-auto text-sm underline"
                                    >
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••••"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    required
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-indigo-700 hover:bg-indigo-600"
                            >
                                Me connecter
                            </button>
                        </div>
                        <div className="mt-6 text-center text-sm">
                            Vous n'avez pas de compte ?
                            <a href="/signup" className="underline ml-2">
                                Créer mon compte
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
