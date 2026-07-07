// Dynamic helper to save verified session to browser memory
export const saveUser = (user, token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("stowave_user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("stowave_user_token", token);
    }
    // Alert the globally mounted header navbar component instantly
    window.dispatchEvent(new Event("auth-change"));
  }
};

// Pure dynamic helper to safely delete session on logout actions
export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("stowave_user");
    localStorage.removeItem("stowave_user_token");
    window.dispatchEvent(new Event("auth-change"));
  }
};
