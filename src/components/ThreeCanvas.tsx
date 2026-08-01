"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DEBRIS_COUNT = 50;
const colorChoices = [
  new THREE.Color("#ef4444"), // Red (needs repair)
  new THREE.Color("#eab308"), // Yellow (resell)
  new THREE.Color("#3b82f6"), // Blue (donate)
  new THREE.Color("#10b981"), // Emerald (recycle)
];

const DEBRIS_DATA = (() => {
  const items = [];
  for (let i = 0; i < DEBRIS_COUNT; i++) {
    const radius = 3.2 + Math.random() * 0.8;
    const speed = 0.15 + Math.random() * 0.2;
    const initialAngle = Math.random() * Math.PI * 2;
    const inclineX = (Math.random() - 0.5) * 0.5; // Inclination of orbit
    const inclineZ = (Math.random() - 0.5) * 0.5;
    const scale = Math.random() * 0.12 + 0.04;
    const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

    items.push({
      radius,
      speed,
      angle: initialAngle,
      inclineX,
      inclineZ,
      scale,
      color,
    });
  }
  return items;
})();

const STAR_COUNT = 800;
const STAR_POSITIONS = (() => {
  const positions = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = -10 - Math.random() * 20; // Keep behind the Earth
  }
  return positions;
})();

// Custom component to manage the Earth sphere and orbiting objects
function EarthScene() {
  const globeRef = useRef<THREE.Points | null>(null);
  const orbitGroupRef = useRef<THREE.Group | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);

  // 1. Generate Earth Sphere Particles
  const sphereCount = 2800;
  const [spherePositions, sphereColors] = useMemo(() => {
    const positions = new Float32Array(sphereCount * 3);
    const colors = new Float32Array(sphereCount * 3);

    const color1 = new THREE.Color("#10b981"); // Emerald
    const color2 = new THREE.Color("#00f5ff"); // Cyan

    for (let i = 0; i < sphereCount; i++) {
      // Golden spiral distribution on sphere for uniform look
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / sphereCount);
      const theta = Math.PI * (1 + 5 ** 0.5) * k;

      const radius = 2.2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation based on height and longitude
      const mixRatio = (y + radius) / (radius * 2);
      const mixedColor = new THREE.Color().lerpColors(color1, color2, mixRatio + Math.sin(theta) * 0.1);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, []);

  const debrisRef = useRef<THREE.Mesh[]>([]);

  // 4. Scroll Tracking & Smooth Camera Shift Ref
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Animating the scene
  useFrame((state, delta) => {
    // Rotation of Earth & orbit group
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.05 * delta;
      globeRef.current.rotation.x += 0.01 * delta;
    }

    if (starsRef.current) {
      starsRef.current.rotation.z -= 0.005 * delta;
    }

    // Interpolate scroll position for slow rotation increase
    scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;
    const scrollProgress = scrollRef.current.y / (document.documentElement.scrollHeight - window.innerHeight || 1);

    // Apply scroll transitions to globe position and scale
    if (globeRef.current && orbitGroupRef.current) {
      // Rotate Earth slowly over time, slightly influenced by scroll
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.08 + scrollProgress * 1.5;

      // Stable position: slightly right-aligned on wide screens, centered on mobile
      const isMobile = state.viewport.width < 6;
      const targetX = isMobile ? 0 : 1.3;
      const targetY = isMobile ? -0.5 : 0;
      const targetScale = isMobile ? 0.75 : 1.15;

      // Parallax mouse follow
      const mouseX = state.pointer.x * 0.4;
      const mouseY = state.pointer.y * 0.4;

      // Lerp position
      const targetPos = new THREE.Vector3(targetX + mouseX, targetY + mouseY, 0);
      globeRef.current.position.lerp(targetPos, 0.05);
      orbitGroupRef.current.position.lerp(targetPos, 0.05);

      // Lerp scale
      const currentScale = globeRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      globeRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);
      orbitGroupRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);
    }

    // Animate individual orbiting items
    debrisRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const info = DEBRIS_DATA[index];
      info.angle += info.speed * delta;

      // Calculate position based on inclined circular orbits
      const x = info.radius * Math.cos(info.angle);
      const y = info.radius * Math.sin(info.angle) * info.inclineX;
      const z = info.radius * Math.sin(info.angle) * (1 - Math.abs(info.inclineZ));

      mesh.position.set(x, y, z);
      // Spin the debris items
      mesh.rotation.x += 0.5 * delta;
      mesh.rotation.y += 0.3 * delta;
    });
  });

  return (
    <>
      {/* Background space particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[STAR_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f5ff"
          size={0.05}
          transparent
          opacity={0.4}
          sizeAttenuation={true}
        />
      </points>

      {/* Earth Particle Cloud */}
      <points ref={globeRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[spherePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[sphereColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation={true}
        />
      </points>

      {/* Orbiting Debris */}
      <group ref={orbitGroupRef}>
        {DEBRIS_DATA.map((data, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) debrisRef.current[i] = el;
            }}
          >
            {/* Standard low-poly geometry representing debris items */}
            {i % 3 === 0 ? (
              <boxGeometry args={[data.scale, data.scale, data.scale]} />
            ) : i % 3 === 1 ? (
              <octahedronGeometry args={[data.scale * 0.7]} />
            ) : (
              <tetrahedronGeometry args={[data.scale * 0.8]} />
            )}
            <meshBasicMaterial
              color={data.color}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-black">
      {/* Ambient background blur circles */}
      <div className="aurora-bg" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <EarthScene />
      </Canvas>
    </div>
  );
}
