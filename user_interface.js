import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default class UserInteraction {
    constructor(scene, renderer, lights, fog, object, animations) {

        function colorCallback(object, color) {
            object.color.set(color);
        }

        function shadowsCallback(enabled) {
            scene.traverseVisible(function (child) { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            });
        }

        function createEmoteCallback(animations, name) {
            callbacks[name] = function () {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);
        }

        // Create the graphical user interface
        this.gui = new GUI({ hideable: false });

        // Create the lights folder
        const lightsFolder = this.gui.addFolder("Lights");

        // Create the ambient light folder
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Create point light #1 folder
        const pointLight1Folder = lightsFolder.addFolder("Point light #1");
        const pointLight1 = lights.object.pointLight1;
        const pointColor1 = { color: "#" + new THREE.Color(pointLight1.color).getHexString() };
        pointLight1Folder.addColor(pointColor1, "color").onChange(color => colorCallback(pointLight1, color));
        pointLight1Folder.add(lights.object.pointLight1, "intensity", 0.0, 100.0, 1.0);
        pointLight1Folder.add(lights.object.pointLight1, "distance", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "x", -4.25, 10.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "y", 4.45, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "z", 4, 10.0, 0.01);

        // Create point light #2 folder
        const pointLight2Folder = lightsFolder.addFolder("Point light #2");
        const pointLight2 = lights.object.pointLight2;
        const pointColor2 = { color: "#" + new THREE.Color(pointLight2.color).getHexString() };
        pointLight2Folder.addColor(pointColor2, "color").onChange(color => colorCallback(pointLight2, color));
        pointLight2Folder.add(lights.object.pointLight2, "intensity", 0.0, 100.0, 1.0);
        pointLight2Folder.add(lights.object.pointLight2, "distance", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "x", -1.25, 10.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "y", 4.45, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "z", 4, 10.0, 0.01);

        // Create point light #3 folder
        const pointLight3Folder = lightsFolder.addFolder("Point light #3");
        const pointLight3 = lights.object.pointLight3;
        const pointColor3 = { color: "#" + new THREE.Color(pointLight3.color).getHexString() };
        pointLight3Folder.addColor(pointColor3, "color").onChange(color => colorCallback(pointLight3, color));
        pointLight3Folder.add(lights.object.pointLight3, "intensity", 0.0, 100.0, 1.0);
        pointLight3Folder.add(lights.object.pointLight3, "distance", 0.0, 20.0, 0.01);
        pointLight3Folder.add(lights.object.pointLight3.position, "x", 2.8, 10.0, 0.01);
        pointLight3Folder.add(lights.object.pointLight3.position, "y", 4.45, 20.0, 0.01);
        pointLight3Folder.add(lights.object.pointLight3.position, "z", 4, 10.0, 0.01);

        // Create point light #4 folder
        const pointLight4Folder = lightsFolder.addFolder("Point light #4");
        const pointLight4 = lights.object.pointLight4;
        const pointColor4 = { color: "#" + new THREE.Color(pointLight4.color).getHexString() };
        pointLight4Folder.addColor(pointColor4, "color").onChange(color => colorCallback(pointLight4, color));
        pointLight4Folder.add(lights.object.pointLight4, "intensity", 0.0, 100.0, 1.0);
        pointLight4Folder.add(lights.object.pointLight4, "distance", 0.0, 20.0, 0.01);
        pointLight4Folder.add(lights.object.pointLight4.position, "x", -4.25, 10.0, 0.01);
        pointLight4Folder.add(lights.object.pointLight4.position, "y", 4.45, 20.0, 0.01);
        pointLight4Folder.add(lights.object.pointLight4.position, "z", -4, 10.0, 0.01);

        // Create point light #5 folder
        const pointLight5Folder = lightsFolder.addFolder("Point light #5");
        const pointLight5 = lights.object.pointLight5;
        const pointColor5 = { color: "#" + new THREE.Color(pointLight5.color).getHexString() };
        pointLight5Folder.addColor(pointColor5, "color").onChange(color => colorCallback(pointLight5, color));
        pointLight5Folder.add(lights.object.pointLight5, "intensity", 0.0, 100.0, 1.0);
        pointLight5Folder.add(lights.object.pointLight5, "distance", 0.0, 20.0, 0.01);
        pointLight5Folder.add(lights.object.pointLight5.position, "x", -1.25, 10.0, 0.01);
        pointLight5Folder.add(lights.object.pointLight5.position, "y", 4.45, 20.0, 0.01);
        pointLight5Folder.add(lights.object.pointLight5.position, "z", -4, 10.0, 0.01);

        // Create point light #6 folder
        const pointLight6Folder = lightsFolder.addFolder("Point light #2");
        const pointLight6 = lights.object.pointLight2;
        const pointColor6 = { color: "#" + new THREE.Color(pointLight6.color).getHexString() };
        pointLight6Folder.addColor(pointColor6, "color").onChange(color => colorCallback(pointLight6, color));
        pointLight6Folder.add(lights.object.pointLight6, "intensity", 0.0, 100.0, 1.0);
        pointLight6Folder.add(lights.object.pointLight6, "distance", 0.0, 20.0, 0.01);
        pointLight6Folder.add(lights.object.pointLight6.position, "x", 2.80, 10.0, 0.01);
        pointLight6Folder.add(lights.object.pointLight6.position, "y", 4.45, 20.0, 0.01);
        pointLight6Folder.add(lights.object.pointLight6.position, "z", -4, 10.0, 0.01);

        // Create the shadows folder
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        // Create the fog folder
        const fogFolder = this.gui.addFolder("Fog");
        const fogColor = { color: "#" + new THREE.Color(fog.color).getHexString() };
        fogFolder.add(fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange(color => colorCallback(fog.object, color));
        fogFolder.add(fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(fog.object, "far", 1.01, 20.0, 0.01);

        // Create the character folder
        const characterFolder = this.gui.addFolder("Character");

        // Create the emotes folder and add emotes
        const emotesFolder = characterFolder.addFolder("Emotes");
        const callbacks = [];
        for (let i = 0; i < animations.emotes.length; i++) {
            createEmoteCallback(animations, animations.emotes[i]);
        }

        // Create the expressions folder and add expressions
        const expressionsFolder = characterFolder.addFolder("Expressions");
        const face = object.getObjectByName("Head_4");
        const expressions = Object.keys(face.morphTargetDictionary);
        for (let i = 0; i < expressions.length; i++) {
            expressionsFolder.add(face.morphTargetInfluences, i, 0.0, 1.0, 0.01).name(expressions[i]);
        }
    }

    setVisibility(visible) {
        if (visible) {
            this.gui.show();
        }
        else {
            this.gui.hide();
        }
    }
}