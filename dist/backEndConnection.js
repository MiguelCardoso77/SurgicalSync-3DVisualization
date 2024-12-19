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

    async getRoomData(id){
        try{
            const response = await axios.get('https://surgicalsyncbackend.azurewebsites.net/api/surgeryRooms/{id}', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            return response.data.map(room => ({
                id: room.roomNumber,
                maintenceSlots : room.maintenceSlots,
                currentStatus : room.currentStatus,
                assignedEquipment : room.assignedEquipment,
                capacity: room.capacity,
                type : room.type
            }));
        } catch (error) {
            console.error("Failed to fetch surgery room data:", error);
            return [];
        }


    }
}

export default BackEndConnection;
