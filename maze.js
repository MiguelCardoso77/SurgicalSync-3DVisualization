import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    doors;
    otherDoors;
    doorRightTextureUrl;
    doorLeftTextureUrl;
    groundTextureUrl;
    wallTextureUrl;
    url;
    scale;

    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.map;
            this.size = description.size;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();
            this.doors = [];
            this.otherDoors = [];

            // Create the ground
            this.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            this.object.add(this.ground.object);

            // Create a wall and a door
            this.wall = new Wall({ textureUrl: description.wallTextureUrl });
            this.doorR = new Wall({ textureUrl: description.doorRightTextureUrl });
            this.doorL = new Wall({ textureUrl: description.doorLeftTextureUrl });

            // Build the maze
            let doorObject;
            let wallObject;
            for (let i = 0; i <= description.size.width; i++) { // Map width includes extra column for eastmost walls
                for (let j = 0; j <= description.size.height; j++) { // Map height includes extra row for southmost walls
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    if (description.map[j][i] === 7) {
                        doorObject = this.doorR.object.clone();
                        doorObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(doorObject);
                        this.doors.push(doorObject);
                    }

                    if (description.map[j][i] === 8) {
                        doorObject = this.doorL.object.clone();
                        doorObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(doorObject);
                        this.doors.push(doorObject);
                        this.otherDoors.push(doorObject);
                    }

                    if (description.map[j][i] === 2 || description.map[j][i] === 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }

                    if (description.map[j][i] === 1 || description.map[j][i] === 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                }
            }

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    OpenAllDoors() {
        this.doors.forEach(door => {
            // Store the initial X position of each door
            const initialPositionX = door.position.x;
            const targetOffset = 1; // Adjust this value to control how far the door slides
            const duration = 2.5; // Shorter duration in seconds (you can change this to your preferred value)

            let startTime = null; // Track the start time for each animation

            // Determine the direction based on whether the door is in the otherDoors array
            const isInOtherDoors = this.otherDoors.includes(door); // Check if the door is in the otherDoors array
            const directionMultiplier = isInOtherDoors ? -1 : 1; // Set direction based on the array

            function animate(timestamp) {
                if (!startTime) startTime = timestamp; // Initialize start time on first frame
                const elapsed = (timestamp - startTime) / 1000; // Convert timestamp to seconds

                // If the animation has run for the duration, stop the animation
                if (elapsed > duration) return;

                // Calculate the progress as a linear movement from 0 to 1
                const progress = elapsed / duration; // Progress from 0 to 1 over the duration

                // Move door in the correct direction
                door.position.x = initialPositionX + directionMultiplier * progress * targetOffset; // Move left or right

                // Request the next frame of the animation
                requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate); // Start the animation loop
        });
    }

    CloseAllDoors() {
        this.doors.forEach(door => {
            // Store the initial X position of each door
            const initialPositionX = door.position.x;
            const targetOffset = 1; // Adjust this value to control how far the door slides
            const duration = 2.5; // Duration in seconds for closing animation
            let startTime = null; // Track the start time for each animation

            // Determine the direction based on whether the door is in the otherDoors array
            const isInOtherDoors = this.otherDoors.includes(door); // Check if the door is in the otherDoors array
            const directionMultiplier = isInOtherDoors ? 1 : -1; // Set direction for closing (move to the right if in otherDoors)

            function animate(timestamp) {
                if (!startTime) startTime = timestamp; // Initialize start time on first frame
                const elapsed = (timestamp - startTime) / 1000; // Convert timestamp to seconds

                // If the animation has run for the duration, stop the animation
                if (elapsed > duration) return;

                // Calculate the progress as a linear movement from 0 to 1
                const progress = elapsed / duration; // Progress from 0 to 1 over the duration

                // Move door in the correct direction
                door.position.x = initialPositionX + directionMultiplier * progress * targetOffset; // Move left or right

                // Request the next frame of the animation
                requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate); // Start the animation loop
        });
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] === 1 || this.map[indices[0]][indices[1]] === 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] === 1 || this.map[indices[0]][indices[1]] === 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] === 2 || this.map[indices[0]][indices[1]] === 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] === 2 || this.map[indices[0]][indices[1]] === 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };
}