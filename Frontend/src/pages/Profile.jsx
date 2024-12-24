import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase"; // Import db (Firestore) here
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("profileInfo");

  // State for storing form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState(""); // Allow user to enter their email manually
  const [gender, setGender] = useState("");
  
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set user information if logged in
        fetchUserDetails(user.uid); // Fetch user details from Firestore
      } else {
        setUser(null); // If no user, set to null
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/"); // Redirect to the home page after logout
    });
  };

  // Function to fetch user details from Firestore
  const fetchUserDetails = async (userId) => {
    try {
      const docRef = doc(db, "users", userId); // Get reference to user document
      const docSnap = await getDoc(docRef); // Fetch the document

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setAge(userData.age || "");
        setEmail(userData.email || ""); // Email can be entered manually
        setGender(userData.gender || "");
      }
    } catch (error) {
      console.error("Error getting user details:", error);
    }
  };

  // Function to save user details to Firestore
  const saveUserDetails = async () => {
    if (user) {
      try {
        await setDoc(
          doc(db, "users", user.uid), // Set user document reference
          {
            firstName,
            lastName,
            age,
            email,
            gender,
          },
          { merge: true } // Merge to avoid overwriting existing data
        );
        alert("User details updated successfully!");
      } catch (error) {
        console.error("Error saving user details:", error);
      }
    }
  };

  // Render content based on selected section
  const renderContent = () => {
    if (!user) {
      return <p>Please log in to view your profile details.</p>;
    }

    switch (selectedSection) {
      case "myOrders":
        return <p>Here you can view your order history.</p>;
      case "profileInfo":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={() => setGender("Male")}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={() => setGender("Female")}
                    className="mr-2"
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={() => setGender("Other")}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveUserDetails}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        );
      case "managePatients":
        return <p>Manage your patients here.</p>;
      case "manageAddress":
        return <p>Manage your address information here.</p>;
      case "wallet":
        return <p>Check your wallet balance and transactions here.</p>;
      default:
        return <p>Select a section from the left.</p>;
    }
  };

  return (
    <div className="min-h-screen p-28 bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-6">
        {/* User Phone Number at the Top */}
        <div className="text-xl font-semibold text-gray-800 mb-6">
          {user ? user.phoneNumber : "Not Logged In"}
        </div>

        {/* Sidebar Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => setSelectedSection("myOrders")}
            className="w-full text-left p-3 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            My Orders
          </button>
          <button
            onClick={() => setSelectedSection("profileInfo")}
            className="w-full text-left p-3 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Profile Info
          </button>
          <button
            onClick={() => setSelectedSection("managePatients")}
            className="w-full text-left p-3 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Manage Patients
          </button>
          <button
            onClick={() => setSelectedSection("manageAddress")}
            className="w-full text-left p-3 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Manage Address
          </button>
          <button
            onClick={() => setSelectedSection("wallet")}
            className="w-full text-left p-3 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Wallet
          </button>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
