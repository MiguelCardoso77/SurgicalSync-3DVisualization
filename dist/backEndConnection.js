class BackEndConnection {
   token = "ICcTTh51IzOiBKmftT1SnrBH5d42";

   async checkSurgeryRoomsStatus() {
        try {
            const response = await axios.get('https://surgicalsyncbackend.azurewebsites.net/api/surgeryRooms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.token
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


    async getRoomData(id) {
        try {
            if (!id) {
                throw new Error("Room ID is required.");
            }

            console.log("room id " + id);

            const response = await axios.get(`https://surgicalsyncbackend.azurewebsites.net/api/surgeryRooms/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            })

            console.log("room " + response);

            const roomData = response.data;

            if (!roomData || Object.keys(roomData).length === 0) {
                console.log("Room data not found.");
                return null;
            }

            return {
                id: roomData.roomNumber || null,
                maintenanceSlots: roomData.maintenanceSlots || [],
                currentStatus: roomData.currentStatus || "Unknown",
                assignedEquipment: roomData.assignedEquipment || [],
                capacity: roomData.capacity || 0,
                type: roomData.type || "Undefined"
            };
        } catch (error) {
            console.error("Failed to fetch surgery room data:", error.message);
            return null;
        }
    }

toggleRoomInfoOverlay() {
    const overlay = document.getElementById("roomInfoOverlay");
    if (overlay) {
        overlay.style.display = overlay.style.display === "block" ? "none" : "block";
    }
}
}

export default BackEndConnection;
