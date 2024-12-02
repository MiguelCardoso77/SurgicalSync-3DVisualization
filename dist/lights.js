import * as THREE from "three";

/*
 * parameters = {
 *  ambientLight: { color: Integer, intensity: Float },
 *  pointLight1: { color: Integer, intensity: Float, distance: Float, position: Vector3 },
 *  pointLight2: { color: Integer, intensity: Float, distance: Float, position: Vector3 },
 *  spotLight: { color: Integer, intensity: Float, distance: Float, angle: Float, penumbra: Float, position: Vector3, direction: Float }
 * }
 */

export default class Lights {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the ambient light
        this.object.ambientLight = new THREE.AmbientLight(0xFFFFFF, this.ambientLight.intensity);

        this.object.add(this.object.ambientLight);

        // Create the first point light and turn on shadows for this light
        this.object.pointLight1 = new THREE.PointLight(0xDCDCDC, this.pointLight1.intensity, this.pointLight1.distance);
        this.object.pointLight1.position.set(this.pointLight1.position.x, this.pointLight1.position.y, this.pointLight1.position.z);
        this.object.pointLight1.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight1.shadow.mapSize.width = 256;
        this.object.pointLight1.shadow.mapSize.height = 256;
        this.object.pointLight1.shadow.camera.near = 5.0;
        this.object.pointLight1.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight1);

        // Create the second point light and turn on shadows for this light
        this.object.pointLight2 = new THREE.PointLight(0xDCDCDC, this.pointLight2.intensity, this.pointLight2.distance);
        this.object.pointLight2.position.set(this.pointLight2.position.x, this.pointLight2.position.y, this.pointLight2.position.z);
        this.object.pointLight2.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight2.shadow.mapSize.width = 256;
        this.object.pointLight2.shadow.mapSize.height = 256;
        this.object.pointLight2.shadow.camera.near = 5.0;
        this.object.pointLight2.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight2);

        // Create the third point light and turn on shadows for this light
        this.object.pointLight3 = new THREE.PointLight(0xDCDCDC, this.pointLight3.intensity, this.pointLight3.distance);
        this.object.pointLight3.position.set(this.pointLight3.position.x, this.pointLight3.position.y, this.pointLight3.position.z);
        this.object.pointLight3.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight3.shadow.mapSize.width = 256;
        this.object.pointLight3.shadow.mapSize.height = 256;
        this.object.pointLight3.shadow.camera.near = 5.0;
        this.object.pointLight3.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight3);

        // Create the fourth point light and turn on shadows for this light
        this.object.pointLight4 = new THREE.PointLight(0xDCDCDC, this.pointLight4.intensity, this.pointLight4.distance);
        this.object.pointLight4.position.set(this.pointLight4.position.x, this.pointLight4.position.y, this.pointLight4.position.z);
        this.object.pointLight4.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight4.shadow.mapSize.width = 256;
        this.object.pointLight4.shadow.mapSize.height = 256;
        this.object.pointLight4.shadow.camera.near = 5.0;
        this.object.pointLight4.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight4);

        // Create the fifth point light and turn on shadows for this light
        this.object.pointLight5 = new THREE.PointLight(0xDCDCDC, this.pointLight5.intensity, this.pointLight5.distance);
        this.object.pointLight5.position.set(this.pointLight5.position.x, this.pointLight5.position.y, this.pointLight5.position.z);
        this.object.pointLight5.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight5.shadow.mapSize.width = 256;
        this.object.pointLight5.shadow.mapSize.height = 256;
        this.object.pointLight5.shadow.camera.near = 5.0;
        this.object.pointLight5.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight5);

        // Create the sixth point light and turn on shadows for this light
        this.object.pointLight6 = new THREE.PointLight(0xDCDCDC, this.pointLight6.intensity, this.pointLight6.distance);
        this.object.pointLight6.position.set(this.pointLight6.position.x, this.pointLight6.position.y, this.pointLight6.position.z);
        this.object.pointLight6.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight6.shadow.mapSize.width = 256;
        this.object.pointLight6.shadow.mapSize.height = 256;
        this.object.pointLight6.shadow.camera.near = 5.0;
        this.object.pointLight6.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight6);

        this.object.traverse((child) => {
            if (child.isLight) {
                child.frustumCulled = true;
            }
        });
    }
}