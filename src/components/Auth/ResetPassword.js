import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v2/admin/reset-email`, { email })
            alert('Check your email for the reset password link!');

        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-slate-100'>
            <div className="rounded-lg border bg-white shadow-sm text-card-foreground mx-auto w-full mx-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4" data-v0-t="card">
                <img src="images/bsr-logo.png" alt="BackstageRate Logo" class="w-40 mr-auto ml-5 mt-6 -mb-2" />

                <form onSubmit={handleResetPassword}>
                    <div class="flex flex-col space-y-1.5 p-6">
                        <h3 class="whitespace-nowrap font-semibold tracking-tight text-2xl">Mot de passe oublié</h3>
                        <p class="text-sm text-muted-foreground">
                            Réinitialisez votre mot de passe.
                        </p>
                    </div>
                    <div class="p-6 pt-2">
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
                                <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" type="email" id="email" placeholder="Adresse email" required value={email} onChange={(e) => {
                                    console.log(e.target.value)
                                    setEmail(e.target.value)
                                }} />
                            </div>
                            <button type="submit" disabled={loading} class="inline-flex text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-indigo-700 hover:bg-indigo-600">
                                {loading ? 'Loading...' : 'Réinitialiser mon mot de passe'}
                            </button>
                        </div>
                        <div class="mt-4 -mb-2 text-center text-sm">
                            <a class=" ml-2" href="/signin">
                                ← Retour
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;


