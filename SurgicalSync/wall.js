import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String,
 *  doorObject: THREE.Object3D // porta já criada para adicionar na parede
 * }
 */

export default class Wall {
    textureUrl;

    constructor(parameters) {
        // Initialize parameters
        this.textureUrl = parameters.textureUrl;
        this.doorObject = parameters.doorObject;

        // Define wall dimensions
        const width = 1.055;
        const height = 2.5;
        const depth = 0.1;

        // Create a texture
        const texture = new THREE.TextureLoader().load(this.textureUrl, (texture) => {
            texture.generateMipmaps = false;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
        });

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the front face (a rectangle)
        let geometry = new THREE.PlaneGeometry(width - 0.05, height);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
        let face = new THREE.Mesh(geometry, material);
        face.position.set(0.0, 0.0, depth / 2);
        face.castShadow = true;
        face.receiveShadow = true;
        this.object.add(face);

        // Create the rear face (a rectangle)
        face = new THREE.Mesh().copy(face, false);
        face.rotateY(Math.PI);
        face.position.set(0.0, 0.0, -depth / 2);
        this.object.add(face);

        // Create the two left faces (a four-triangle mesh)
        let points = new Float32Array([
            -width / 2 + 0.025, -height / 2, depth / 2,
            -width / 2 + 0.025, height / 2, depth / 2,
            -width / 2, height / 2, 0.0,
            -width / 2, -height / 2, 0.0,

            -width / 2, height / 2, 0.0,
            -width / 2 + 0.025, height / 2, -depth / 2,
            -width / 2 + 0.025, -height / 2, -depth / 2,
            -width / 2, -height / 2, 0.0
        ]);
        let normals = new Float32Array([
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,

            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707
        ]);
        let indices = [
            0, 1, 2,
            2, 3, 0,
            4, 5, 6,
            6, 7, 4
        ];
        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        material = new THREE.MeshPhongMaterial({ color: 0x6b554b });
        face = new THREE.Mesh(geometry, material);
        face.castShadow = true;
        face.receiveShadow = true;
        this.object.add(face);

        // Create the two right faces (a four-triangle mesh)
        face = new THREE.Mesh().copy(face, false);
        face.rotateY(Math.PI);
        this.object.add(face);

        // Create the top face (a four-triangle mesh)
        points = new Float32Array([
            -width / 2, height / 2, 0.0,
            -width / 2 + 0.025, height / 2, depth / 2,
            -width / 2 + 0.025, height / 2, -depth / 2,
            width / 2 - 0.025, height / 2, depth / 2,
            width / 2 - 0.025, height / 2, -depth / 2,
            width / 2, height / 2, 0.0
        ]);
        normals = new Float32Array([
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ]);
        indices = [
            0, 1, 2,
            2, 1, 3,
            3, 4, 2,
            4, 3, 5
        ];
        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        face = new THREE.Mesh(geometry, material);
        face.castShadow = true;
        face.receiveShadow = true;
        this.object.add(face);
    }

    // Add door function to position door to fill the full height of the wall
    addDoor(i, j, description) {
        const doorObject = this.doorObject.clone();

        // Definir a escala da porta para que ocupe a altura completa da parede
        const wallHeight = 2.0;  // altura total da parede
        const originalDoorHeight = description.size.height; // Altura original da porta
        const scaleRatio = wallHeight / originalDoorHeight; // Proporção necessária para ajustar à altura da parede

        // Ajustar a escala da porta para ocupar a altura total da parede
        doorObject.scale.set(scaleRatio, scaleRatio, 1);  // Escalando proporcionalmente

        // Posicionar a porta no centro da parede
        doorObject.position.set(
            i - description.size.width / 2.0 + 1,
            0,  // Centralizar verticalmente na parede
            j - description.size.height / 4.0
        );

        this.object.add(doorObject);
    }
}
