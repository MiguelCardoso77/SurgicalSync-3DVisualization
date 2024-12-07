class BackEndConnection {

    async checkSurgeryRoomsStatus() {
        try {
            const response = await axios.get('https://surgicalsyncbackend.azurewebsites.net/api/surgeryRooms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            return response.data.map(room => ({
                roomNumber: room.roomNumber,
                currentStatus: room.currentStatus === 'Available'
            }));
        } catch (error) {
            console.error("Failed to fetch surgery room status:", error);
            return [];
        }
    }
}

export default BackEndConnection;
