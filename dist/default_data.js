import * as THREE from "three";
import Orientation from "./orientation.js";

export const generalData = {
    setDevicePixelRatio: false
}

export const mazeData = {
    url: "./mazes/SurgicalFloor.json",
    credits: "Surgical Sync Hospital Floor.",
    scale: new THREE.Vector3(1.0, 1.0, 1.0)
}

export const playerData = {
    url: "./models/gltf/RobotExpressive/RobotExpressive.glb",
    credits: "Model and related code snippets created by <a href='https://www.patreon.com/quaternius' target='_blank' rel='noopener'>Tomás Laulhé</a>. CC0 1.0. Modified by <a href='https://donmccurdy.com/' target='_blank' rel='noopener'>Don McCurdy</a>.",
    eyeHeight: 0.8, // fraction of character height
    scale: new THREE.Vector3(0.1, 0.1, 0.1),
    walkingSpeed: 0.75,
    initialDirection: 0.0, // Expressed in degrees
    turningSpeed: 75.0, // Expressed in degrees / second
    runningFactor: 2.0, // Affects walking speed and turning speed
    keyCodes: { fixedView: "Digit1", viewMode: "KeyV", userInterface: "KeyU", miniMap: "KeyM", help: "KeyH", statistics: "KeyS", run: "KeyR", left: "ArrowLeft", right: "ArrowRight", backward: "ArrowDown", forward: "ArrowUp", jump: "KeyJ", yes: "KeyY", no: "KeyN", wave: "KeyW", punch: "KeyP", thumbsUp: "KeyT" }
}

export const hospitalBedData = {
    url: "./models/gltf/hospital_bed/hospital_bed.glb",
    credits: "This work is based on \"Hospital bed\" (https://sketchfab.com/3d-models/hospital-bed-41cd18dbfcd04efca9d6e861e3cc7663) by Capitaine_Vava (https://sketchfab.com/Capitaine_Vava) licensed under CC-BY-NC-4.0 (https://creativecommons.org/licenses/by-nc/4.0/)"
}

export const humanBodyData = {
    url: "./models/gltf/human_body/human_body.glb",
    credits: "This work is based on \"HUMAN_BODY\" (https://sketchfab.com/3d-models/human-body-f022e4a3641943328b2fbfdf0f7c3e1e) by vistaalienprime (https://sketchfab.com/vistaalienprime5665288) licensed under CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)"
}

export const curtainData = {
    url: "./models/gltf/curtains/curtains.glb",
    credits: "This work is based on \"curtains\" (https://sketchfab.com/3d-models/curtains-233b2736b19b4d51a1be26c217ec3a95) by ThreeDeeCreation (https://sketchfab.com/ThreeDeeCreation) licensed under CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)\""
};

export const elevatorData = {
    url: "./models/gltf/elevator-door/elevator-door.glb",
    credits: "This work is based on \"elevator-door\" (https://sketchfab.com/3d-models/elevator-door-6704273f7f9644bfb875d978486494eb) by 1-3D.com (https://sketchfab.com/1-3D.com) licensed under CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)\""
};

export const lab_benchData = {
    url: "./models/gltf/lab_bench/lab_bench.glb",
    credits: "This work is based on \"lab_bench\" (https://sketchfab.com/3d-models/lab-bench-1ac2a62c52a848bbaf746146dc7253f8) by Konstantin_Keller (https://sketchfab.com/Konstantin_Keller) licensed under CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)\""
};





export const lightsData = {
    ambientLight: { color: 0xffffff, intensity: 1.0 },
    pointLight1: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    pointLight2: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    pointLight3: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    pointLight4: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    pointLight5: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    pointLight6: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },

    spotLight: { color: 0xffffff, intensity: 1.0, distance: 0.0, angle: Math.PI / 3.0, penumbra: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0), direction: 0.0 } // angle and direction expressed in radians
}

export const fogData = {
    enabled: false,
    color: 0xe0e0e0,
    near: 0.1,
    far: 14.0
}

export const cameraData = {
    view: "fixed", // Fixed view: "fixed"; first-person view: "first-person"; third-person view: "third-person"; top view: "top"; mini-map: "mini-map"
    multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 1.0, 1.0), // Viewport position and size: fraction of window width and window height; MUST BE REDEFINED when creating an instance of ThumbRaiser() so that each view is assigned a different viewport
    target: new THREE.Vector3(0.0, 0.0, 0.0), // Target position
    initialOrientation: new Orientation(135.0, -45.0), // Horizontal and vertical orientation and associated limits (expressed in degrees)
    orientationMin: new Orientation(-180.0, -90.0),
    orientationMax: new Orientation(180.0, 0.0),
    initialDistance: 8.0, // Distance to the target and associated limits
    distanceMin: 4.0,
    distanceMax: 16.0,
    initialZoom: 1.0, // Zoom factor and associated limits
    zoomMin: 0.5,
    zoomMax: 2.0,
    initialFov: 45.0, // Field-of-view (expressed in degrees)
    near: 0.01, // Front clipping plane
    far: 100.0 // Back clipping plane
}