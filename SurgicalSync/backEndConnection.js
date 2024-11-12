class BackEndConnection {
    Id = 0;
    CurrentStatus = '';

    async checkSurgeryRoomsStatus() {
        try {
            const response = await fetch('http://localhost:5001/api/surgeryrooms/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error("Failed to fetch surgery room status:", response);
                return [];
            }

            const data = await response.json();
            return data.map(room => ({
                id: room.Id,
                isAvailable: room.CurrentStatus === 'Available'
            }));
        } catch (error) {
            console.error("Failed to fetch surgery room status:", error);
            return [];
        }
    }
}

export default BackEndConnection;
