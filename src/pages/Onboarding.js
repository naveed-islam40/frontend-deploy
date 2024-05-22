import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const inputStyle =
    "flex mt-0.5 h-10 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const halfInputStyle =
    "input border border-slate-200 input-sm ";
const buttonStyle =
    "items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-800 text-primary-foreground hover:bg-indigo-700 h-10 px-4 py-2 w-full";
const selectStyle =
    "flex h-10 mt-0.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        siret: "",
        address: "",
        city: "",
        postalCode: "",
        numOfEmployees: "",
        // step 2 data
        firstName: "",
        lastName: "",
        phone: "",
        position: "",
        howDidYouKnow: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!userId || !token) {
            toast.error("User session error. Please sign up again.");
            navigate("/signup");
            setLoading(false);
            return;
        }

        if (step !== 1) {
            setStep(1);
            setLoading(false);
            return;
        }

        const onboardingData = {
            name: formData.name,
            siret: formData.siret,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            numOfEmployees: formData.numOfEmployees,
        };

        const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v2/register-company/${userId}`;

        try {
            const response = await axios.post(endpoint, onboardingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

            if (response && response.data) {
                localStorage.setItem("companyId", response.data.company._id);
                toast.success("Company Created Successfully");
                setStep(2);
            } else {
                toast.error(response.data.msg || "Failed to complete onboarding.");
            }
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
            toast.error(
                error.response?.data?.msg || "Failed to complete onboarding process."
            );
        } finally {
            setLoading(false);
        }
    };


    const remainingDetails = async () => {
        const step2Data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            position: formData.position,
            howDidYouKnow: formData.howDidYouKnow,
        };
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v2/register/step-two/${userId}`,
            step2Data
        );
        if (response) {
            toast.success("User Details Update Successfully");
            navigate("/dashboard");
        }
    };

    const step1Fields = [
        {
            key: "name",
            label: "Nom de l'entreprise",
            placeholder: "Nom",
            style: halfInputStyle,
        },
        {
            key: "siret",
            label: "Votre numéro SIRET",
            placeholder: "Numéro SIRET",
            style: halfInputStyle,
        },
        {
            key: "address",
            label: "Votre adresse",
            placeholder: "Adresse",
            style: halfInputStyle,
        },
        {
            key: "city",
            label: "Votre ville",
            placeholder: "Ville",
            style: halfInputStyle,
        },
        {
            key: "postalCode",
            label: "Code Postal",
            placeholder: "Code Postal",
            style: halfInputStyle,
        },
        {
            key: "numOfEmployees",
            label: "Nombre d'employés",
            placeholder: "Entrez le nombre d'employés",
            style: halfInputStyle,
        },
    ];

    const step2Fields = [
        {
            key: "firstName",
            label: "Prénom",
            placeholder: "Votre prénom",
            style: halfInputStyle,
        },
        {
            key: "lastName",
            label: "Nom",
            placeholder: "Votre nom",
            style: halfInputStyle,
        },
        {
            key: "phone",
            label: "Téléphone",
            placeholder: "Numéro de téléphone",
            style: halfInputStyle,
        },
        {
            key: "position",
            label: "Poste",
            placeholder: "Entrez votre poste",
            style: halfInputStyle,
        },
        {
            key: "howDidYouKnow",
            label: "Comment avez-vous connu Backstage Rate ?",
            placeholder: "Entrez votre réponse",
            style: halfInputStyle,
        },
    ];

    const fields = step === 1 ? step1Fields : step2Fields;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
            <div className="flex flex-grow items-center justify-center w-3/4h h-16 ">
                <div className="hidden md:block w-2/3 h-5/6 bg-slate-400 rounded-l-lg ">
                    <img
                        src="images/onboarding-img.jpg"
                        alt="BackstageRate Logo"
                        className="w-full h-full object-cover rounded-l-lg"
                    />
                </div>
                <div className="flex flex-col bg-white flex-grow rounded-r-lg bg-card shadow-sm text-card-foreground p-1 w-2/3 justify-between h-5/6">
                    <form onSubmit={handleSubmit}>
                        <img
                            src="images/bsr-logo.png"
                            alt="BackstageRate Logo"
                            className="w-40 mr-auto ml-5 mt-6 -mb-2"
                        />

                        <div className="flex flex-col space-y-1.5 p-6 pt-5 pb-4">
                            <h1 className="whitespace-nowrap font-semibold tracking-tight text-2xl">
                                Bienvenue sur Backstage Rate !
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Améliorez la qualité de travail de votre entreprise.
                            </p>
                        </div>
                        <div className="flex flex-col flex-grow justify-between">
                            <div>
                                <div className="p-6 pt-2 space-y-4">
                                    {fields.map((field) => (
                                        <div className="grid gap-2" key={field.key}>
                                            <label
                                                className="text-sm font-medium leading-none"
                                                htmlFor={field.key}
                                            >
                                                {field.label}
                                            </label>
                                            {field.type === "select" ? (
                                                <select
                                                    id={field.key}
                                                    value={formData[field.key]}
                                                    onChange={(e) =>
                                                        handleChange(field.key, e.target.value)
                                                    }
                                                    required
                                                    className={field.style}
                                                >
                                                    <option value="">{field.placeholder}</option>
                                                    {field.options.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type || "text"}
                                                    id={field.key}
                                                    value={formData[field.key]}
                                                    onChange={(e) =>
                                                        handleChange(field.key, e.target.value)
                                                    }
                                                    placeholder={field.placeholder}
                                                    required
                                                    className={field.style}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-0 px-6">
                                    {step === 1 && (
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`${buttonStyle} text-white`}
                                        >
                                            {loading ? "Loading..." : "Suivant →"}
                                        </button>
                                    )}
                                    {step === 2 && (
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`${buttonStyle} text-white`}
                                            onClick={remainingDetails}
                                        >
                                            {loading ? "Loading..." : "Créer mon compte"}
                                        </button>
                                    )}
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setStep(step - 1)}
                                            className="mt-3 items-center justify-center whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 bg-white text-slate-800 font-medium hover:text-slate-700 px-4 py-0 w-full"
                                        >
                                            Précédent
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Onboarding;