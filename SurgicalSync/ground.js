import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String,
 *  size: Vector2
 * }
 */

export default class Ground {
    textureUrl;
    size;

    constructor(parameters) {
        // Initialize parameters
        this.textureUrl = parameters.textureUrl;
        this.size = parameters.size;

        // Create a texture
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.encoding = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        // Adjust repeat based on size and repeatFactor, if provided
        const repeatFactor = 0.5;
        texture.repeat.set(this.size.width * repeatFactor, this.size.height * repeatFactor);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a ground plane that receives shadows but does not cast them
        const geometry = new THREE.PlaneGeometry(this.size.width, this.size.height);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
        this.object = new THREE.Mesh(geometry, material);
        this.object.rotateX(-Math.PI / 2.0);
        this.object.castShadow = false;
        this.object.receiveShadow = true;
    }
}