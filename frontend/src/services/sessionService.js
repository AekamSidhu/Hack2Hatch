export const getUserSessions = async (userId) => {
    try {
      console.log("Fetching sessions for:", userId);
      const response = await axios.get(`/api/sessions/user/${userId}`, { withCredentials: true });
      return response.data || { data: [] };
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return { data: [] };
    }
  };
  