import * as THREE from "three"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "@react-three/drei"

// Define the box material
const boxMaterial = new THREE.MeshStandardMaterial({
    color: "#f6d171",
    // opacity: 0.5,
    // transparent: true,
    wireframe: false,
    metalness: 0.5,
    polygonOffset: true,
})

// Define the Box component
function Box() {
    return (
        <mesh
            position={[-2, 1, 0]}
            scale={[1, 1, 1]}
            material={boxMaterial}
            className="Box"
        >
            <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
            <meshLambertMaterial
                attach="material"
                color="#f6d171"
            // transparent
            // opacity={0.6}
            />
        </mesh>
    )
}
export function Sphere() {
    return (
        <mesh position={[0, -2, 3]} scale={[1, 1, 1]}>
            <sphereBufferGeometry attach="geometry" args={[2, 50, 50]} />
            <meshLambertMaterial
                attach="material"
                color="#f6d171"
            // transparent
            // opacity={0.6}
            />
        </mesh>
    )
}

// Define the larger component that includes the Box component
function MyComponent() {
    return (
        <Canvas>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[100, 100, 100]} />
            <Box />
            <Sphere />
        </Canvas>
    )
}

export default MyComponent
