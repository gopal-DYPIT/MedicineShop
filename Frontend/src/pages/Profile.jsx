import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {isAuthenticated ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          {/* User Information */}
          <div className="flex flex-col items-center">
            <img
              src={user.picture}
              alt="User Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 space-y-4">
            <p className="text-gray-700">
              <span className="font-bold">Nickname:</span> {user.nickname || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Updated At:</span>{" "}
              {new Date(user.updated_at).toLocaleString()}
            </p>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">
            You need to log in to view this page.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
