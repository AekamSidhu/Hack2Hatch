export const getConversations = async (userId) => {
    try {
      console.log("Fetching conversations for:", userId);
      const response = await axios.get(`/api/messages/conversations/${userId}`, { withCredentials: true });
      return response.data || { data: [] };
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return { data: [] };
    }
  };
  