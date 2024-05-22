import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const adminId = localStorage.getItem("userId");

  const changePassword = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/admin/change-password/${adminId}`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: repeatPassword
        }
      );
      console.log(response);

      if (response) {
        toast.success("Password Changed Successfully")
      }
    } catch (error) {
      console.error("Error", error.message)
    }

  };

  return (
    <div className="p-6 px-8">
      <h3 className="text-lg font-semibold text-bsrate">
        Changer mon mot de passe
      </h3>
      <p className="text-slate-500">Modifiez le mot de passe de votre compte.</p>

      <div className="w-3/6">
        <div className="mt-4">
          <label
            htmlFor="current-password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mot de passe actuel
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="current-password"
              value={currentPassword}
              id="current-password"
              className="input w-full "
              placeholder="•••••••••••••••••"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nouveau mot de passe
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="new-password"
              value={newPassword}
              id="new-password"
              className="input  w-full "
              placeholder="•••••••••••••••••"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="rnew-password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Répétez le nouveau mot de passe
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="rnew-password"
              value={repeatPassword}
              id="rnew-password"
              className="input w-full "
              placeholder="•••••••••••••••••"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
         className="btn bg-bsrate hover:bg-black text-white mt-4 mb-1"
          onClick={changePassword}
        >
          Mettre à jour
        </button>
      </div>
    </div>
  );
}

export default PasswordSettings;
