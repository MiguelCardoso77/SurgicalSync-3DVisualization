// Thumb Raiser - JPP 2021, 2022, 2023
// 3D modeling
// 3D models importing
// Perspective and orthographic projections
// Viewing
// Linear and affine transformations
// Lighting and materials
// Shadow projection
// Fog
// Texture mapping
// User interaction

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import Orientation from "./orientation.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {
    cameraData,
    curtainData,
    elevatorData,
    fogData,
    generalData,
    hospitalBedData,
    humanBodyData,
    lab_benchData,
    lightsData,
    mazeData,
    playerData
} from "./default_data.js";
import {merge} from "./merge.js";
import Maze from "./maze.js";
import Player from "./player.js";
import Lights from "./lights.js";
import Fog from "./fog.js";
import Camera from "./camera.js";
import Animations from "./animations.js";
import UserInterface from "./user_interface.js";
import BackEndConnection from "./backEndConnection.js";
/*
 * generalParameters = {
 *  setDevicePixelRatio: Boolean
 * }
 *
 * mazeParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 *
 * playerParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3,
 *  walkingSpeed: Float,
 *  initialDirection: Float,
 *  turningSpeed: Float,
 *  runningFactor: Float,
 *  keyCodes: { fixedView: String, firstPersonView: String, thirdPersonView: String, topView: String, viewMode: String, userInterface: String, miniMap: String, help: String, statistics: String, run: String, left: String, right: String, backward: String, forward: String, jump: String, yes: String, no: String, wave: String, punch: String, thumbsUp: String }
 * }
 *
 * lightsParameters = {
 *  ambientLight: { color: Integer, intensity: Float },
 *  pointLight1: { color: Integer, intensity: Float, range: Float, position: Vector3 },
 *  pointLight2: { color: Integer, intensity: Float, range: Float, position: Vector3 },
 *  spotLight: { color: Integer, intensity: Float, range: Float, angle: Float, penumbra: Float, position: Vector3, direction: Float }
 * }
 *
 * fogParameters = {
 *  enabled: Boolean,
 *  color: Integer,
 *  near: Float,
 *  far: Float
 * }
 *
 * fixedViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * firstPersonViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * thirdPersonViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * topViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * miniMapCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 */

export default class ThumbRaiser {
    constructor(generalParameters, mazeParameters, playerParameters, lightsParameters, fogParameters, fixedViewCameraParameters, firstPersonViewCameraParameters, thirdPersonViewCameraParameters, topViewCameraParameters, miniMapCameraParameters) {
        this.generalParameters = merge({}, generalData, generalParameters);
        this.mazeParameters = merge({}, mazeData, mazeParameters);
        this.playerParameters = merge({}, playerData, playerParameters);
        this.lightsParameters = merge({}, lightsData, lightsParameters);
        this.fogParameters = merge({}, fogData, fogParameters);
        this.fixedViewCameraParameters = merge({}, cameraData, fixedViewCameraParameters);
        this.firstPersonViewCameraParameters = merge({}, cameraData, firstPersonViewCameraParameters);
        this.thirdPersonViewCameraParameters = merge({}, cameraData, thirdPersonViewCameraParameters);
        this.topViewCameraParameters = merge({}, cameraData, topViewCameraParameters);
        this.miniMapCameraParameters = merge({}, cameraData, miniMapCameraParameters);

        const loader = new GLTFLoader();
        const clickableObjects = [];
        let counter = 1;

        const bedPositions = [
            [-4.25, 0.3, 4],
            [-1.25, 0.3, 4],
            [2.80, 0.3, 4],
            [-4.25, 0.3, -4],
            [-1.25, 0.3, -4],
            [2.80, 0.3, -4]
        ];

        bedPositions.forEach(position => {
            loader.load(
                hospitalBedData.url,
                (gltf) => {
                    const hospitalBed = gltf.scene;

                    hospitalBed.scale.set(0.02, 0.02, 0.02);
                    hospitalBed.position.set(...position);

                    hospitalBed.name = `hospitalBed_${counter}`;
                    this.scene3D.add(hospitalBed);

                    const boundingBox = new THREE.Box3().setFromObject(hospitalBed);
                    const size = new THREE.Vector3();
                    const center = new THREE.Vector3();
                    boundingBox.getSize(size);
                    boundingBox.getCenter(center);

                    const geometry = new THREE.BoxGeometry(size.x + 0.1, size.y + 0.2, size.z + 0.1);
                    const material = new THREE.MeshBasicMaterial({
                        color: 0x00ff00,
                        transparent: true,
                        opacity: 0,
                    });

                    const solidBox = new THREE.Mesh(geometry, material);
                    solidBox.name = `solidBox_${counter}`;
                    solidBox.position.copy(center);
                    solidBox.userData.hospitalBed = hospitalBed;

                    this.scene3D.add(solidBox);
                    clickableObjects.push(solidBox);

                    counter++;
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the model:', error);
                }
            );
        });

        const curtainsPositions = [
            [-4.96, 0.2, 3.3],
            [-1.96, 0.2, 3.3],
            [1.95, 0.2, 3.3],
            [-4.96, 0.2, -3.3],
            [-1.96, 0.2, -3.3],
            [1.95, 0.2, -3.3]
        ];

        curtainsPositions.forEach((position, index) => {
            loader.load(
                curtainData.url,
                (gltf) => {
                    const curtains = gltf.scene;

                    if (index < 3) {
                        curtains.scale.set(-0.002, 0.0011, 0.002);
                    } else {
                        curtains.scale.set(0.002, 0.0011, 0.002);
                    }
                    curtains.position.set(...position);

                    curtains.rotation.y = Math.PI / 2;

                    this.scene3D.add(curtains);
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the model:', error);
                }
            );
        });

        const api = new BackEndConnection();
        api.checkSurgeryRoomsStatus().then((status) => {
            const roomIsOpen = status.map(room => room.currentStatus);

            const bodyPositions = [
                [-3.75, 0.5, 4],
                [-0.70, 0.5, 4],
                [3.35, 0.5, 4],
                [-3.75, 0.5, -4],
                [-0.70, 0.5, -4],
                [3.35, 0.5, -4]
            ];

            bodyPositions.forEach((position, index) => {
                if (!roomIsOpen[index]) {
                    loader.load(
                        humanBodyData.url,
                        (gltf) => {
                            const humanBody = gltf.scene;

                            humanBody.scale.set(0.25, 0.25, 0.25);
                            humanBody.position.set(...position);
                            humanBody.rotation.x = -Math.PI / 2;
                            humanBody.rotation.z = Math.PI / 2;

                            this.scene3D.add(humanBody);
                        },
                        undefined,
                        (error) => {
                            console.error('An error occurred while loading the model:', error);
                        }
                    );
                }
            });
        });

        const elevatorPosition = [
            [-4.85, 0.65, 0],
        ];

        elevatorPosition.forEach((position, index) => {
            loader.load(
                elevatorData.url,
                (gltf) => {
                    const elevator = gltf.scene;

                    elevator.scale.set(0.006, 0.0045, 0.006);

                    elevator.position.set(...position);

                    elevator.rotation.y = Math.PI / 2;

                    this.scene3D.add(elevator);
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the model:', error);
                }
            );
        });


        const lab_benchPositions = [
            [-2.3, 0, 4],
            [1.75, 0, 4],
            [4.8, 0, 4],
            [-2.3, 0, -4],
            [1.75, 0, -4],
            [4.8, 0, -4]
        ];

        lab_benchPositions.forEach((position, index) => {
            loader.load(
                lab_benchData.url,
                (gltf) => {
                    const lab_bench = gltf.scene;

                    if (index < 3) {
                        lab_bench.scale.set(-0.7, 0.5, -0.7);
                    } else {
                        lab_bench.scale.set(0.7, 0.5, -0.7);
                    }
                    lab_bench.position.set(...position);

                    lab_bench.rotation.y = Math.PI / 2;

                    this.scene3D.add(lab_bench);
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the model:', error);
                }
            );
        });

        // Create a 2D scene (the viewports frames)
        this.scene2D = new THREE.Scene();

        // Create a square
        let points = [new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(1.0, 0.0, 0.0), new THREE.Vector3(1.0, 1.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0)];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({color: 0xffffff});
        this.square = new THREE.LineLoop(geometry, material);
        this.scene2D.add(this.square);

        // Create the camera corresponding to the 2D scene
        this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

        // Create a 3D scene (the game itself)
        this.scene3D = new THREE.Scene();

        // Create the maze
        this.maze = new Maze(this.mazeParameters);

        // Create the player
        this.player = new Player(this.playerParameters);

        // Create the lights
        this.lights = new Lights(this.lightsParameters);

        // Create the fog
        this.fog = new Fog(this.fogParameters);

        // Create the cameras corresponding to the four different views: fixed view, first-person view, third-person view and top view
        this.fixedViewCamera = new Camera(this.fixedViewCameraParameters, window.innerWidth, window.innerHeight);
        this.firstPersonViewCamera = new Camera(this.firstPersonViewCameraParameters, window.innerWidth, window.innerHeight);
        this.thirdPersonViewCamera = new Camera(this.thirdPersonViewCameraParameters, window.innerWidth, window.innerHeight);
        this.topViewCamera = new Camera(this.topViewCameraParameters, window.innerWidth, window.innerHeight);

        // Create the mini-map camera
        this.miniMapCamera = new Camera(this.miniMapCameraParameters, window.innerWidth, window.innerHeight);

        // Create the statistics and make its node invisible
        this.statistics = new Stats();
        this.statistics.dom.style.visibility = "hidden";
        document.body.appendChild(this.statistics.dom);

        // Create a renderer and turn on shadows in the renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        if (this.generalParameters.setDevicePixelRatio) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Set the mouse move action (none)
        this.dragMiniMap = false;
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;

        // Set the game state
        this.gameRunning = false;

        // Get and configure the panel's <div> elements
        this.viewsPanel = document.getElementById("views-panel");
        this.view = document.getElementById("view");
        this.projection = document.getElementById("projection");
        this.horizontal = document.getElementById("horizontal");
        this.horizontal.step = 1;
        this.vertical = document.getElementById("vertical");
        this.vertical.step = 1;
        this.distance = document.getElementById("distance");
        this.distance.step = 0.1;
        this.zoom = document.getElementById("zoom");
        this.zoom.step = 0.1;
        this.reset = document.getElementById("reset");
        this.resetAll = document.getElementById("reset-all");
        this.helpPanel = document.getElementById("help-panel");
        this.helpPanel.style.visibility = "hidden";
        this.subwindowsPanel = document.getElementById("subwindows-panel");
        this.multipleViewsCheckBox = document.getElementById("multiple-views");
        this.multipleViewsCheckBox.checked = false;
        this.userInterfaceCheckBox = document.getElementById("user-interface");
        this.userInterfaceCheckBox.checked = true;
        this.miniMapCheckBox = document.getElementById("mini-map");
        this.miniMapCheckBox.checked = true;
        this.helpCheckBox = document.getElementById("help");
        this.helpCheckBox.checked = false;
        this.statisticsCheckBox = document.getElementById("statistics");
        this.statisticsCheckBox.checked = false;

        // Build the help panel
        //this.buildHelpPanel();

        // Set the active view camera (fixed view)
        this.setActiveViewCamera(this.fixedViewCamera);

        // Arrange viewports by view mode
        this.arrangeViewports(this.multipleViewsCheckBox.checked);

        // Register the event handler to be called on window resize
        window.addEventListener("resize", event => this.windowResize(event));

        // Register the event handler to be called on key down
        document.addEventListener("keydown", event => this.keyChange(event, true));

        // Register the event handler to be called on key release
        document.addEventListener("keyup", event => this.keyChange(event, false));

        // Register the event handler to be called on mouse down
        this.renderer.domElement.addEventListener("mousedown", event => this.mouseDown(event, clickableObjects));

        // Register the event handler to be called on bed click
        this.renderer.domElement.addEventListener('click', (event) => this.buttonClick(event));

        // Register the event handler to be called on mouse move
        this.renderer.domElement.addEventListener("mousemove", event => this.mouseMove(event));

        // Register the event handler to be called on mouse move
        this.renderer.domElement.addEventListener("menuInfo", event => this.onKeyDown(event));

        // Register the event handler to be called on mouse up
        this.renderer.domElement.addEventListener("mouseup", event => this.mouseUp(event));

        // Register the event handler to be called on mouse wheel
        this.renderer.domElement.addEventListener("wheel", event => this.mouseWheel(event));

        // Register the event handler to be called on context menu
        this.renderer.domElement.addEventListener("contextmenu", event => this.contextMenu(event));

        // Register the event handler to be called on select, input number, or input checkbox change
        this.view.addEventListener("change", event => this.elementChange(event));
        this.projection.addEventListener("change", event => this.elementChange(event));
        this.horizontal.addEventListener("change", event => this.elementChange(event));
        this.vertical.addEventListener("change", event => this.elementChange(event));
        this.distance.addEventListener("change", event => this.elementChange(event));
        this.zoom.addEventListener("change", event => this.elementChange(event));
        this.multipleViewsCheckBox.addEventListener("change", event => this.elementChange(event));
        this.userInterfaceCheckBox.addEventListener("change", event => this.elementChange(event));
        this.helpCheckBox.addEventListener("change", event => this.elementChange(event));
        this.statisticsCheckBox.addEventListener("change", event => this.elementChange(event));

        // Register the event handler to be called on input button click
        this.reset.addEventListener("click", event => this.buttonClick(event));
        this.resetAll.addEventListener("click", event => this.buttonClick(event));

        this.activeElement = document.activeElement;
    }

    /*buildHelpPanel() {
        const table = document.getElementById("help-table");
        let i = 0;
        for (const key in this.player.keyCodes) {
            while (table.rows[i].cells.length < 2) {
                i++;
            }
            ;
            table.rows[i++].cells[0].innerHTML = this.player.keyCodes[key];
        }
        table.rows[i].cells[0].innerHTML = this.maze.credits + "<br>" + this.player.credits;
    }*/

    displayPanel() {
        this.view.options.selectedIndex = ["fixed", "first-person", "third-person", "top"].indexOf(this.activeViewCamera.view);
        this.projection.options.selectedIndex = ["perspective", "orthographic"].indexOf(this.activeViewCamera.projection);
        this.horizontal.value = this.activeViewCamera.orientation.h.toFixed(0);
        this.vertical.value = this.activeViewCamera.orientation.v.toFixed(0);
        this.distance.value = this.activeViewCamera.distance.toFixed(1);
        this.zoom.value = this.activeViewCamera.zoom.toFixed(1);
    }

    // Set active view camera
    setActiveViewCamera(camera) {
        this.activeViewCamera = camera;
        this.horizontal.min = this.activeViewCamera.orientationMin.h.toFixed(0);
        this.horizontal.max = this.activeViewCamera.orientationMax.h.toFixed(0);
        this.vertical.min = this.activeViewCamera.orientationMin.v.toFixed(0);
        this.vertical.max = this.activeViewCamera.orientationMax.v.toFixed(0);
        this.distance.min = this.activeViewCamera.distanceMin.toFixed(1);
        this.distance.max = this.activeViewCamera.distanceMax.toFixed(1);
        this.zoom.min = this.activeViewCamera.zoomMin.toFixed(1);
        this.zoom.max = this.activeViewCamera.zoomMax.toFixed(1);
        this.displayPanel();
    }

    arrangeViewports(multipleViews) {
        this.fixedViewCamera.setViewport(multipleViews);
        this.firstPersonViewCamera.setViewport(multipleViews);
        this.thirdPersonViewCamera.setViewport(multipleViews);
        this.topViewCamera.setViewport(multipleViews);
    }

    pointerIsOverViewport(pointer, viewport) {
        return (
            pointer.x >= viewport.x &&
            pointer.x < viewport.x + viewport.width &&
            pointer.y >= viewport.y &&
            pointer.y < viewport.y + viewport.height);
    }

    getPointedViewport(pointer) {
        let viewport;
        // Check if the pointer is over the mini-map camera viewport
        if (this.miniMapCheckBox.checked) {
            viewport = this.miniMapCamera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return this.miniMapCamera.view;
            }
        }
        // Check if the pointer is over the remaining camera viewports
        let cameras;
        if (this.multipleViewsCheckBox.checked) {
            cameras = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera];
        } else {
            cameras = [this.activeViewCamera];
        }
        for (const camera of cameras) {
            viewport = camera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return camera.view;
            }
        }
        // No camera viewport is being pointed
        return "none";
    }

    setViewMode(multipleViews) { // Single-view mode: false; multiple-views mode: true
        this.multipleViewsCheckBox.checked = multipleViews;
        this.arrangeViewports(this.multipleViewsCheckBox.checked);
    }

    setUserInterfaceVisibility(visible) {
        this.userInterfaceCheckBox.checked = visible;
        this.viewsPanel.style.visibility = visible ? "visible" : "hidden";
        this.subwindowsPanel.style.visibility = visible ? "visible" : "hidden";
        this.userInterface.setVisibility(visible);
    }

    setMiniMapVisibility(visible) { // Hidden: false; visible: true
        this.miniMapCheckBox.checked = visible;
    }

    setHelpVisibility(visible) { // Hidden: false; visible: true
        this.helpCheckBox.checked = visible;
        this.helpPanel.style.visibility = visible ? "visible" : "hidden";
    }

    setStatisticsVisibility(visible) { // Hidden: false; visible: true
        this.statisticsCheckBox.checked = visible;
        this.statistics.dom.style.visibility = visible ? "visible" : "hidden";
    }

    windowResize() {
        this.fixedViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.firstPersonViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.thirdPersonViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.topViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.miniMapCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    keyChange(event, state) {
        // Allow digit and arrow keys to be used when entering numbers
        if (["horizontal", "vertical", "distance", "zoom"].indexOf(event.target.id) < 0) {
            event.target.blur();
        }
        if (document.activeElement === document.body) {
            // Prevent the "Space" and "Arrow" keys from scrolling the document's content
            if (event.code === "Space" || event.code === "ArrowLeft" || event.code === "ArrowRight" || event.code === "ArrowDown" || event.code === "ArrowUp") {
                event.preventDefault();
            }
            if (event.code === this.player.keyCodes.fixedView && state) { // Select fixed view
                this.setActiveViewCamera(this.fixedViewCamera);
            } else if (event.code === this.player.keyCodes.firstPersonView && state) { // Select first-person view
                this.setActiveViewCamera(this.firstPersonViewCamera);
            } else if (event.code === this.player.keyCodes.thirdPersonView && state) { // Select third-person view
                this.setActiveViewCamera(this.thirdPersonViewCamera);
            } else if (event.code === this.player.keyCodes.topView && state) { // Select top view
                this.setActiveViewCamera(this.topViewCamera);
            }
            if (event.code === this.player.keyCodes.viewMode && state) { // Single-view mode / multiple-views mode
                this.setViewMode(!this.multipleViewsCheckBox.checked);
            }
            if (event.code === this.player.keyCodes.userInterface && state) { // Display / hide user interface
                this.setUserInterfaceVisibility(!this.userInterfaceCheckBox.checked);
            }
            if (event.code === this.player.keyCodes.miniMap && state) { // Display / hide mini-map
                this.setMiniMapVisibility(!this.miniMapCheckBox.checked);
            }
            if (event.code === this.player.keyCodes.help && state) { // Display / hide help
                this.setHelpVisibility(!this.helpCheckBox.checked);
            }
            if (event.code === this.player.keyCodes.statistics && state) { // Display / hide statistics
                this.setStatisticsVisibility(!this.statisticsCheckBox.checked);
            }
            if (event.code === this.player.keyCodes.run) {
                this.player.keyStates.run = state;
            }
            if (event.code === this.player.keyCodes.left) {
                this.player.keyStates.left = state;
            } else if (event.code === this.player.keyCodes.right) {
                this.player.keyStates.right = state;
            }
            if (event.code === this.player.keyCodes.backward) {
                this.player.keyStates.backward = state;
            } else if (event.code === this.player.keyCodes.forward) {
                this.player.keyStates.forward = state;
            }
            if (event.code === this.player.keyCodes.jump) {
                this.player.keyStates.jump = state;
            } else if (event.code === this.player.keyCodes.yes) {
                this.player.keyStates.yes = state;
            } else if (event.code === this.player.keyCodes.no) {
                this.player.keyStates.no = state;
            } else if (event.code === this.player.keyCodes.wave) {
                this.player.keyStates.wave = state;
            } else if (event.code === this.player.keyCodes.punch) {
                this.player.keyStates.punch = state;
                this.addMenuInfo();
            } else if (event.code === this.player.keyCodes.thumbsUp) {
                this.player.keyStates.thumbsUp = state;
            }
        }
    }

    /**
     mouseDown(event) {
     if (event.buttons !== 2) return; //ignore left button
     // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
     this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
     // Select the camera whose view is being pointed
     const cameraView = this.getPointedViewport(this.mousePosition);
     if (cameraView !== "none" ) {
     if (cameraView === "mini-map") {// Mini-map camera selected
     this.dragMiniMap = true;
     } else {
     const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
     this.view.options.selectedIndex = cameraIndex;
     this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex]);
     this.changeCameraOrientation = true;
     this.changeCameraDistance = true;
     }
     }

     }
     */

    mouseDown(event, clickableObjects) {
        if (event.button === 0) {
            this.handleBedSelection(event, clickableObjects);
        } else if (event.button === 2) { // Right-click (original behavior)
            if (event.buttons !== 2) return; // Ignore unless the right button is pressed

            // Store current mouse position in window coordinates
            this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);

            // Select the camera whose view is being pointed
            const cameraView = this.getPointedViewport(this.mousePosition);
            if (cameraView !== "none") {
                if (cameraView === "mini-map") {
                    this.dragMiniMap = true;
                } else {
                    const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
                    this.view.options.selectedIndex = cameraIndex;
                    this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex]);
                    this.changeCameraOrientation = true;
                    this.changeCameraDistance = true;
                }
            }
        }
    }

    mouseMove(event) {
        if (event.buttons !== 2) return; //ignore left button
        if (this.changeCameraOrientation || this.dragMiniMap) { // Mouse action in progress
            // Compute mouse movement and update mouse position
            const newMousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
            const mouseIncrement = newMousePosition.clone().sub(this.mousePosition);
            this.mousePosition = newMousePosition;

            if (this.dragMiniMap) {
                const windowMinSize = Math.min(window.innerWidth, window.innerHeight);
                const width = this.miniMapCamera.viewport.width * windowMinSize;
                const height = this.miniMapCamera.viewport.height * windowMinSize;
                this.miniMapCamera.viewport.x += mouseIncrement.x / (window.innerWidth - width);
                this.miniMapCamera.viewport.y += mouseIncrement.y / (window.innerHeight - height);
            }
            if (this.changeCameraOrientation) {
                this.activeViewCamera.updateOrientation(mouseIncrement.multiply(new THREE.Vector2(-0.5, 0.5)));
                this.displayPanel();
            }
        }
    }

    mouseUp(event) {
        // Reset mouse move action
        this.dragMiniMap = false;
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;
    }

    mouseWheel(event) {
        // Prevent the mouse wheel from scrolling the document's content
        event.preventDefault();
        // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
        this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
        // Select the camera whose view is being pointed
        const cameraView = this.getPointedViewport(this.mousePosition);

        if (cameraView !== "none" && cameraView !== "mini-map") { // One of the remaining cameras selected
            const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
            this.view.options.selectedIndex = cameraIndex;
            const activeViewCamera = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex];
            activeViewCamera.updateZoom(-0.001 * event.deltaY);
            this.setActiveViewCamera(activeViewCamera);
        }
    }

    animateToTarget(camera, targetPosition, targetLookAt, duration) {
        const startPosition = camera.position.clone();
        const startLookAt = camera.getWorldDirection(new THREE.Vector3()).clone();
        const deltaPosition = targetPosition.clone().sub(startPosition);
        const deltaLookAt = targetLookAt.clone().sub(startLookAt);

        let elapsedTime = 0;

        const animate = () => {
            if (elapsedTime < duration) {
                elapsedTime += 1 / 60;
                const t = elapsedTime / duration;

                camera.position.set(
                    startPosition.x + deltaPosition.x * t,
                    startPosition.y + deltaPosition.y * t,
                    startPosition.z + deltaPosition.z * t
                );

                const currentLookAt = startLookAt.clone().add(deltaLookAt.clone().multiplyScalar(t));
                camera.lookAt(currentLookAt);

                requestAnimationFrame(animate);
            } else {
                camera.position.copy(targetPosition);
                camera.lookAt(targetLookAt);
            }
        };
        animate();
    }

    selectedBed = null;

    handleBedSelection(event, clickableObjects) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        if (!clickableObjects || clickableObjects.length === 0) {
            console.error("No clickable objects available for raycasting.");
            return;
        }

        if (!this.fixedViewCamera) {
            console.error("Active camera is not set. Cannot perform raycasting.");
            return;
        }

        raycaster.setFromCamera(mouse, this.activeViewCamera.object);

        const intersects = raycaster.intersectObjects(clickableObjects, true);
        console.log("Intersects:", intersects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            const associatedBed = clickedObject.userData.hospitalBed;
            if (associatedBed) {
                console.log("Selected bed:", associatedBed.name);
                this.selectedBed = associatedBed;
                this.handleBedInteraction(associatedBed);
            } else {
                console.warn("No bed linked to this bounding box!");
            }
        }
    }

    rotateCamera(degrees) {
        const radians = degrees * (Math.PI / 180); // Converte graus para radianos
        // Supõe-se que `camera` é sua instância da câmera
        this.camera.rotation.y += radians;
        // Atualiza a renderização, se necessário, dependendo do seu framework
        this.renderScene();
    }


    renderScene() {
        // Se estiver usando Three.js, seria algo como:
        this.renderer.render(this.scene, this.camera);
    }

    handleBedInteraction(bed) {
        console.log("Interacting with bed:", bed.name);

        let roomCenterPosition = new THREE.Vector3();

        switch (bed.name) {
            case 'hospitalBed_1':
                roomCenterPosition.set(-3, 0, 3); // Centro da sala 1
                break;
            case 'hospitalBed_2':
                roomCenterPosition.set(0, 0, 3); // Centro da sala 2
                break;
            case 'hospitalBed_3':
                roomCenterPosition.set(4, 0, 3);  // Centro da sala 3
                break;
            case 'hospitalBed_4':
                roomCenterPosition.set(-3, 0, -3); // Centro da sala 4
                break;
            case 'hospitalBed_5':
                roomCenterPosition.set(0, 0, -3); // Centro da sala 5
                break;
            case 'hospitalBed_6':
                roomCenterPosition.set(4, 0, -3);  // Centro da sala 6
                break;
            default:
                console.log('Unknown bed:', bed.name);
                return;
        }

        // Posicionar a câmera diretamente acima do centro da sala
        const newCameraPosition = roomCenterPosition.clone().add(new THREE.Vector3(0, 5, 0)); // 7 unidades acima

        this.animateToTarget(this.fixedViewCamera.object, newCameraPosition, roomCenterPosition, 2);
    }

    contextMenu(event) {
        // Prevent the context menu from appearing when the secondary mouse button is clicked
        event.preventDefault();
    }

    elementChange(event) {
        switch (event.target.id) {
            case "view":
                this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][this.view.options.selectedIndex]);
                break;
            case "projection":
                this.activeViewCamera.setActiveProjection(["perspective", "orthographic"][this.projection.options.selectedIndex]);
                this.displayPanel();
                break;
            case "horizontal":
            case "vertical":
            case "distance":
            case "zoom":
                if (event.target.checkValidity()) {
                    switch (event.target.id) {
                        case "horizontal":
                        case "vertical":
                            this.activeViewCamera.setOrientation(new Orientation(this.horizontal.value, this.vertical.value));
                            break;
                        case "distance":
                            this.activeViewCamera.setDistance(this.distance.value);
                            break;
                        case "zoom":
                            this.activeViewCamera.setZoom(this.zoom.value);
                            break;
                    }
                }
                break;
            case "multiple-views":
                this.setViewMode(event.target.checked);
                break;
            case "user-interface":
                this.setUserInterfaceVisibility(event.target.checked);
                break;
            case "help":
                this.setHelpVisibility(event.target.checked);
                break;
            case "statistics":
                this.setStatisticsVisibility(event.target.checked);
                break;
        }
    }

    buttonClick(event) {
        switch (event.target.id) {
            case "reset":
                this.activeViewCamera.initialize();
                break;
            case "reset-all":
                this.fixedViewCamera.initialize();
                this.firstPersonViewCamera.initialize();
                this.thirdPersonViewCamera.initialize();
                this.topViewCamera.initialize();
                break;
        }
        this.displayPanel();
    }

    finalSequence() {
        // Disable the fog
        this.fog.enabled = false;
        // Reconfigure the third-person view camera
        this.thirdPersonViewCamera.setOrientation(new Orientation(180.0, this.thirdPersonViewCamera.initialOrientation.v));
        this.thirdPersonViewCamera.setDistance(this.thirdPersonViewCamera.initialDistance);
        this.thirdPersonViewCamera.setZoom(2.0);
        // Set it as the active view camera
        this.setActiveViewCamera(this.thirdPersonViewCamera);
        // Set single-view mode
        this.setViewMode(false);
        // Set the final action
        this.animations.fadeToAction("Dance", 0.2);
    }

    collision(position) {
        return this.maze.distanceToWestWall(position) < this.player.radius || this.maze.distanceToEastWall(position) < this.player.radius || this.maze.distanceToNorthWall(position) < this.player.radius || this.maze.distanceToSouthWall(position) < this.player.radius;
    }

    update() {
        if (!this.gameRunning) {
            if (this.maze.loaded && this.player.loaded) { // If all resources have been loaded
                // Add the maze, the player and the lights to the scene
                this.scene3D.add(this.maze.object);
                this.scene3D.add(this.player.object);
                this.scene3D.add(this.lights.object);

                // Create the clock
                this.clock = new THREE.Clock();

                // Create model animations (states, emotes and expressions)
                this.animations = new Animations(this.player.object, this.player.animations);

                // Set the player's position and direction
                this.player.position = this.maze.initialPosition.clone();
                this.player.direction = this.maze.initialDirection;

                // Create the user interface
                this.userInterface = new UserInterface(this.scene3D, this.renderer, this.lights, this.fog, this.player.object, this.animations);

                // Start the game
                this.gameRunning = true;
            }
        } else {
            // Update the model animations
            const deltaT = this.clock.getDelta();
            this.animations.update(deltaT);

            // Update the player
            if (!this.animations.actionInProgress) {
                // Check if the player found the exit
                if (this.maze.foundExit(this.player.position)) {
                    this.finalSequence();
                } else {
                    let coveredDistance = this.player.walkingSpeed * deltaT;
                    let directionIncrement = this.player.turningSpeed * deltaT;
                    if (this.player.keyStates.run) {
                        coveredDistance *= this.player.runningFactor;
                        directionIncrement *= this.player.runningFactor;
                    }
                    if (this.player.keyStates.left) {
                        this.player.direction += directionIncrement;
                    } else if (this.player.keyStates.right) {
                        this.player.direction -= directionIncrement;
                    }
                    const direction = THREE.MathUtils.degToRad(this.player.direction);
                    if (this.player.keyStates.backward) {
                        const newPosition = new THREE.Vector3(-coveredDistance * Math.sin(direction), 0.0, -coveredDistance * Math.cos(direction)).add(this.player.position);
                        if (this.collision(newPosition)) {
                            this.animations.fadeToAction("Death", 0.2);
                        } else {
                            this.animations.fadeToAction(this.player.keyStates.run ? "Running" : "Walking", 0.2);
                            this.player.position = newPosition;
                        }
                    } else if (this.player.keyStates.forward) {
                        const newPosition = new THREE.Vector3(coveredDistance * Math.sin(direction), 0.0, coveredDistance * Math.cos(direction)).add(this.player.position);
                        if (this.collision(newPosition)) {
                            this.animations.fadeToAction("Death", 0.2);
                        } else {
                            this.animations.fadeToAction(this.player.keyStates.run ? "Running" : "Walking", 0.2);
                            this.player.position = newPosition;
                        }
                    } else if (this.player.keyStates.jump) {
                        this.animations.fadeToAction("Jump", 0.2);
                    } else if (this.player.keyStates.yes) {
                        this.animations.fadeToAction("Yes", 0.2);
                        this.maze.OpenAllDoors();
                    } else if (this.player.keyStates.no) {
                        this.animations.fadeToAction("No", 0.2);
                        this.maze.CloseAllDoors();
                    } else if (this.player.keyStates.wave) {
                        this.animations.fadeToAction("Wave", 0.2);
                    } else if (this.player.keyStates.punch) {
                        this.animations.fadeToAction("Punch", 0.2);
                    } else if (this.player.keyStates.thumbsUp) {
                        this.animations.fadeToAction("ThumbsUp", 0.2);
                    } else {
                        this.animations.fadeToAction("Idle", this.animations.activeName !== "Death" ? 0.2 : 0.6);
                    }
                    this.player.object.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
                    this.player.object.rotation.y = direction - this.player.initialDirection;
                }
            }

            // Update first-person, third-person and top view cameras parameters (player direction and target)
            this.firstPersonViewCamera.playerDirection = this.player.direction;
            this.thirdPersonViewCamera.playerDirection = this.player.direction;
            this.topViewCamera.playerDirection = this.player.direction;
            const target = new THREE.Vector3(this.player.position.x, this.player.position.y + this.player.eyeHeight, this.player.position.z);
            this.firstPersonViewCamera.setTarget(target);
            this.thirdPersonViewCamera.setTarget(target);
            this.topViewCamera.setTarget(target);

            // Update statistics
            this.statistics.update();

            // Render primary viewport(s)
            this.renderer.clear();

            if (this.fog.enabled) {
                this.scene3D.fog = this.fog.object;
            } else {
                this.scene3D.fog = null;
            }
            let cameras;
            if (this.multipleViewsCheckBox.checked) {
                cameras = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera];
            } else {
                cameras = [this.activeViewCamera];
            }
            for (const camera of cameras) {
                this.player.object.visible = (camera !== this.firstPersonViewCamera);
                const viewport = camera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, camera.object);
                this.renderer.render(this.scene2D, this.camera2D);
                this.renderer.clearDepth();
            }

            // Render secondary viewport (mini-map)
            if (this.miniMapCheckBox.checked) {
                this.scene3D.fog = null;
                this.player.object.visible = true;
                const viewport = this.miniMapCamera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, this.miniMapCamera.object);
                this.renderer.render(this.scene2D, this.camera2D);
            }
        }
    }

    async addMenuInfo() {
        if (!this.selectedBed || !this.selectedBed.name) {
            console.log('No bed selected or bed has no name.');
            return;
        }

        const bedMapping = {
            'hospitalBed_1': 1,
            'hospitalBed_2': 2,
            'hospitalBed_3': 3,
            'hospitalBed_4': 4,
            'hospitalBed_5': 5,
            'hospitalBed_6': 6
        };

        const id = bedMapping[this.selectedBed.name];

        if (!id) {
            console.log('Unknown bed:', this.selectedBed.name);
            return;
        }

        const api = new BackEndConnection();
        console.log("Buscando dados da sala com ID: ", id);


        try {
            console.log("bed: " + id);

            api.getRoomData(id).then((surgeryRoom) => {
                const data = surgeryRoom || {}; // Garante que 'data' sempre será um objeto.

                console.log("id: " + id);
                console.log("maintenanceSlots: " + (data.maintenanceSlots || "------"));
                console.log("capacity: " + (data.capacity || "------"));
                console.log("assignedEquipment: " + (data.assignedEquipment || "------"));
                console.log("currentStatus: " + (data.currentStatus || "Unknown"));

                const overlay = document.getElementById('roomInfoOverlay');


                if (overlay) {
                    // Cria o conteúdo da tabela dinamicamente
                    const tableContent = `
                <h3>Room Information</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>${this.selectedBed?.name || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><strong>ID:</strong></td>
                            <td>${id || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><strong>Status:</strong></td>
                            <td>${data.currentStatus || "Unknown"}</td>
                        </tr>
                        <tr>
                            <td><strong>Type:</strong></td>
                            <td>${data.type || "Undefined"}</td>
                        </tr>
                        <tr>
                            <td><strong>Capacity:</strong></td>
                            <td>${data.capacity || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><strong>Maintenance Slots:</strong></td>
                            <td>${data.maintenanceSlots || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><strong>Assigned Equipment:</strong></td>
                            <td>${data.assignedEquipment || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            `;

                    // Substitui o conteúdo do overlay com o conteúdo da tabela
                    overlay.innerHTML = tableContent;

                    overlay.style.display = "block";  // Exibe o overlay

                } else {
                    console.error("Overlay element with id 'roomInfoOverlay' not found.");
                }
            }).catch((error) => {
                console.error("Failed to fetch room data:", error);
            });
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }

    } catch (error) {
            console.error('Error fetching room data:', error);
        }
}