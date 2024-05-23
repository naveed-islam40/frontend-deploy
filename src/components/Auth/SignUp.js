import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";

const SignUp = () => {
    const navigate = useNavigate(); // Moved here, at the top level of your component
    const [user, setUser] = useState({
        // firstName: "",
        // lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        // phone: "",
        // image: "", // Change to null for File type
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target; // Destructuring for simplicity
        setUser({ ...user, [name]: name === "image" ? files[0] : value }); // Handle file input
    };

    const submitData = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            // formData.append("firstName", user.firstName);
            // formData.append("lastName", user.lastName);
            // formData.append("email", user.email);
            // formData.append("password", user.password);
            // formData.append("confirmPassword", user.confirmPassword);
            // formData.append("phone", user.phone);
            // formData.append("image", user.image);

            const result = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v2/register/step-one`,
                user
            );

            if (result) {
                console.log("response signup", result.data);
                // localStorage.setItem("Admin", result.data.admin._id)
                localStorage.setItem("userId", result.data.admin);
                localStorage.setItem("token", result.data.token);
            }

            toast.success("User registered successflly");
            navigate("/onboarding");
        } catch (error) {
            toast.error("Resgisteration Failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="rounded-lg border bg-white shadow-sm text-card-foreground mx-auto w-full mx-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <form onSubmit={submitData} encType="multipart/form-data">
                    <img
                        src="images/bsr-logo.png"
                        alt="BackstageRate Logo"
                        className="w-40 mr-auto ml-5 mt-6 -mb-2"
                    />
                    <div className="flex flex-col space-y-1.5 p-6 pb-0">
                        <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">
                            Créer mon compte
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Créez votre compte BackstageRate.
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="grid gap-4">
                            {/* <div className="grid gap-2">
                                {/* <label htmlFor="image" className="text-sm font-medium">
                                    Upload Your Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="image"
                                    required
                                    onChange={handleChange}
                                /> */}
                            {/* <FileBase multiple={false} type="file" onDone={({ base64 }) => setUser({ ...user, image: base64 })} /> */}
                            {/* </div>  */}
                            {/* <div className="grid gap-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                    First name
                                </label>
                                <input
                                    type="Text"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="firstName"
                                    required
                                    value={user.firstName}
                                    onChange={handleChange}
                                />
                            </div> */}

                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="adresse@mail.com"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="email"
                                    required
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••••"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="password"
                                    required
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-medium"
                                >
                                    Répétez le mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••••"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="confirmPassword"
                                    required
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* <div className="grid gap-2">
                                <label htmlFor="Phone" className="text-sm font-medium">
                                    Phone
                                </label>
                                <input
                                    type="Text"
                                    id="phone"
                                    placeholder="Enter your number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    name="phone"
                                    required
                                    value={user.phone}
                                    onChange={handleChange}
                                />
                            </div> */}
                        </div>
                        <button
                            type="submit"
                            className="mt-4 inline-flex items-center text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-indigo-700 hover:bg-indigo-600"
                        >
                            {loading ? "Loading..." : "Créer mon compte"}
                        </button>
                    </div>
                    <div className="text-center text-sm mb-6">
                        Vous avez déjà un compte ?
                        <a className="underline ml-2" href="/signin">
                            Connectez-vous
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;