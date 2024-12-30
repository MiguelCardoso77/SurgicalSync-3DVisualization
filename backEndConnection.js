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


    async getRoomData(id) {
        try {
            console.log("Início de getRoomData, ID: " + id);

            if (!id) {
                throw new Error("Room ID is required.");
            }

            const token = "ICcTTh51IzOiBKmftT1SnrBH5d42";

            // Faz a requisição para a API com o cabeçalho Authorization
            const response = await axios.get(`https://surgicalsyncbackend.azurewebsites.net/api/surgeryRooms/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

            // Exibe a resposta para verificar a estrutura
            console.log("Resposta da API:", response.data);

            // Verifique se a resposta contém dados
            const roomData = response.data;

            if (!roomData || Object.keys(roomData).length === 0) {
                console.log("Dados da sala não encontrados ou resposta vazia.");
                return null;
            }

            // Exibe os dados da sala para depuração
            console.log("Room Data:", roomData);

            // Retorna os dados, garantindo que as propriedades existam
            return {
                id: roomData.roomNumber || null,
                maintenceSlots: roomData.maintenceSlots || [],
                currentStatus: roomData.currentStatus || "Unknown",
                assignedEquipment: roomData.assignedEquipment || [],
                capacity: roomData.capacity || 0,
                type: roomData.type || "Undefined"
            };
        } catch (error) {
            // Trata e exibe erros detalhados
            console.error("Failed to fetch surgery room data:", error.message);
            return null;
        }
    }

// Função para alternar a visibilidade do overlay
toggleRoomInfoOverlay() {
    const overlay = document.getElementById("roomInfoOverlay");
    if (overlay) {
        overlay.style.display = overlay.style.display === "block" ? "none" : "block";
    }
}
}

export default BackEndConnection;
