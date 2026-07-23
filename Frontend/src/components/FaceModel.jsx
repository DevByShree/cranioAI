import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Center } from "@react-three/drei";

function Model() {
  const group = useRef();
  const { scene } = useGLTF("/models/face.glb");

  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.5
  })

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 0.3;
        child.material.metalness = 0.05;
        child.material.needsUpdate = true;
        child.geometry.computeVertexNormals();
      }
    });
  }, [scene]);

  return (
    <group ref={group} >
      <Center>
        <primitive
          object={scene}
          scale={0.2}
          position={[0, 5, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </Center>
    </group>
  );
}

export default function FaceModel() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 100], fov: 45 }}
      style={{ width: "100%", height: "100%" }}>

      <ambientLight intensity={0.4} />

      <hemisphereLight
        intensity={1}
        groundColor="#666"
      />

      <directionalLight
        position={[10, 10, 10]}
        intensity={2}
        castShadow
      />

      <spotLight
        position={[0, 15, 15]}
        angle={0.35}
        penumbra={1}
        intensity={3}
        castShadow
      />

      <Environment preset="sunset" />

      <Model />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={false}
        // autoRotateSpeed={1}
        minDistance={100}
        maxDistance={200}
        minPolarAngle={0}
        // maxPolarAngle={Math.PI / 2}
        maxPolarAngle={2.1}
      />
    </Canvas>
  );
}