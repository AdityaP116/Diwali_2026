import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Diya3DCanvasProps {
  className?: string;
  enableInteraction?: boolean;
}

export const Diya3DCanvas: React.FC<Diya3DCanvasProps> = ({
  className = '',
  enableInteraction = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera & WebGL Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Adjusted camera height & distance for elegant eye-level perspective
    camera.position.set(0, 3.2, 6.2);
    camera.lookAt(0, 0.6, 0);

    // Explicit transparent WebGL background (no black box, blends naturally with DOM)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0); // Completely transparent background
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // Group to hold complete Diya for tilt / rotation
    const diyaGroup = new THREE.Group();
    // Centered pivot height
    diyaGroup.position.set(0, -0.2, 0);
    scene.add(diyaGroup);

    // --- 1. Materials: Regal Champagne Brass & Antique Gold ---
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9b66f, // Champagne gold
      roughness: 0.22,
      metalness: 0.88,
    });

    const polishedGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3dba9, // Warm highlights
      roughness: 0.15,
      metalness: 0.95,
    });

    // Deep warm consecrated sesame oil / ghee
    const oilMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a2a12,
      roughness: 0.05,
      metalness: 0.35,
    });

    // Cotton wick with charred tip
    const wickMaterial = new THREE.MeshStandardMaterial({
      color: 0x242426,
      roughness: 0.9,
    });

    // --- 2. Geometry: Authentic Traditional Indian Brass Diya (Deepam) ---
    // Pedestal Base + Slender Neck + Fluted Oil Bowl + Spout
    // Pedestal Footing
    const basePoints: THREE.Vector2[] = [];
    basePoints.push(new THREE.Vector2(0, 0));
    basePoints.push(new THREE.Vector2(1.1, 0.02));
    basePoints.push(new THREE.Vector2(1.15, 0.12));
    basePoints.push(new THREE.Vector2(0.85, 0.22));
    basePoints.push(new THREE.Vector2(0.55, 0.35));
    basePoints.push(new THREE.Vector2(0.48, 0.5));
    basePoints.push(new THREE.Vector2(0.65, 0.62));
    basePoints.push(new THREE.Vector2(0.9, 0.72));
    basePoints.push(new THREE.Vector2(1.7, 0.95));
    basePoints.push(new THREE.Vector2(2.1, 1.25));
    basePoints.push(new THREE.Vector2(2.2, 1.4));
    basePoints.push(new THREE.Vector2(1.95, 1.36));
    basePoints.push(new THREE.Vector2(1.6, 1.05));
    basePoints.push(new THREE.Vector2(0, 0.92));

    const latheGeo = new THREE.LatheGeometry(basePoints, 52);
    // Pinched nose spout for authentic wick placement at +Z
    const pos = latheGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      if (z > 0.6 && y > 0.8) {
        x *= 0.68;
        z *= 1.22;
      }
      pos.setXYZ(i, x, y, z);
    }
    latheGeo.computeVertexNormals();

    const diyaMesh = new THREE.Mesh(latheGeo, brassMaterial);
    diyaMesh.castShadow = true;
    diyaMesh.receiveShadow = true;
    diyaGroup.add(diyaMesh);

    // --- 3. Filigree Gold Beaded Rim Detailing ---
    const beadCount = 38;
    const beadRadius = 0.055;
    const beadGeo = new THREE.SphereGeometry(beadRadius, 12, 12);
    const beadsGroup = new THREE.Group();

    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      let rx = Math.cos(angle) * 2.15;
      let rz = Math.sin(angle) * 2.15;
      if (rz > 0.6) {
        rx *= 0.68;
        rz *= 1.22;
      }
      const bead = new THREE.Mesh(beadGeo, polishedGoldMaterial);
      bead.position.set(rx, 1.38, rz);
      beadsGroup.add(bead);
    }
    diyaGroup.add(beadsGroup);

    // --- 4. Ghee / Oil Pool ---
    const oilGeo = new THREE.CylinderGeometry(1.65, 1.3, 0.1, 32);
    const oilMesh = new THREE.Mesh(oilGeo, oilMaterial);
    oilMesh.position.set(0, 1.02, 0.15);
    diyaGroup.add(oilMesh);

    // --- 5. Cotton Batti (Wick) ---
    const wickGeo = new THREE.CylinderGeometry(0.04, 0.055, 0.42, 12);
    const wickMesh = new THREE.Mesh(wickGeo, wickMaterial);
    wickMesh.position.set(0, 1.26, 1.76);
    wickMesh.rotation.x = Math.PI / 5.5;
    diyaGroup.add(wickMesh);

    // --- 6. Flame Hierarchy with Pure Additive Blending (No dark boxes) ---
    // Outer Flame Corona (Warm Golden Amber)
    const outerFlameGeo = new THREE.ConeGeometry(0.3, 1.15, 24);
    outerFlameGeo.translate(0, 0.58, 0);
    const outerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xe5a955,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat);
    outerFlame.position.set(0, 1.34, 1.78);
    diyaGroup.add(outerFlame);

    // Inner Radiant Flame Core (Ivory / Champagne)
    const innerFlameGeo = new THREE.ConeGeometry(0.16, 0.8, 20);
    innerFlameGeo.translate(0, 0.4, 0);
    const innerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xfff1d8,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const innerFlame = new THREE.Mesh(innerFlameGeo, innerFlameMat);
    innerFlame.position.set(0, 1.35, 1.78);
    diyaGroup.add(innerFlame);

    // Base Blue Combustion Root
    const blueFlameGeo = new THREE.SphereGeometry(0.11, 12, 12);
    const blueFlameMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const blueFlame = new THREE.Mesh(blueFlameGeo, blueFlameMat);
    blueFlame.position.set(0, 1.38, 1.78);
    blueFlame.scale.set(1, 0.45, 1);
    diyaGroup.add(blueFlame);

    // --- 7. Lighting Environment ---
    // Warm flame point light casting soft shadows on brass curves
    const flameLight = new THREE.PointLight(0xd9b66f, 3.6, 12, 1.1);
    flameLight.position.set(0, 1.95, 1.78);
    flameLight.castShadow = true;
    flameLight.shadow.bias = -0.002;
    diyaGroup.add(flameLight);

    // Subtle warm rim light for champagne brass specular highlights
    const keyLight = new THREE.DirectionalLight(0xfff1d8, 1.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x24334b, 0.8);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xd9b66f, 0.9);
    backRimLight.position.set(0, 4, -4);
    scene.add(backRimLight);

    // --- 8. Rising Embers Particles ---
    const emberCount = 32;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities: { x: number; y: number; z: number; life: number }[] = [];

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 0.35;
      emberPositions[i * 3 + 1] = 1.4 + Math.random() * 1.8;
      emberPositions[i * 3 + 2] = 1.78 + (Math.random() - 0.5) * 0.35;
      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: 0.016 + Math.random() * 0.018,
        z: (Math.random() - 0.5) * 0.012,
        life: Math.random(),
      });
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xf3dba9,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberParticles = new THREE.Points(emberGeo, emberMat);
    diyaGroup.add(emberParticles);

    // --- Interactive Hover & Orbit Controls ---
    let targetRotY = 0;
    let targetRotX = 0.12;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      if (!enableInteraction) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = mouseX * 0.6;
      targetRotX = 0.12 - mouseY * 0.22;
    };

    container.addEventListener('mousemove', onPointerMove);

    const onTouchMove = (e: TouchEvent) => {
      if (!enableInteraction || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      targetRotY = mouseX * 0.65;
    };
    container.addEventListener('touchmove', onTouchMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth damped rotation on mouse interaction
      diyaGroup.rotation.y += (targetRotY - diyaGroup.rotation.y) * 0.06;
      diyaGroup.rotation.x += (targetRotX - diyaGroup.rotation.x) * 0.06;

      // Realistic Multi-harmonic Flame Flicker
      const flicker =
        Math.sin(time * 9.5) * 0.06 +
        Math.cos(time * 14.2) * 0.04 +
        Math.sin(time * 22.0) * 0.025;

      outerFlame.scale.set(
        1 + flicker * 0.7,
        1 + flicker * 1.4,
        1 + flicker * 0.7
      );
      outerFlame.rotation.z = Math.sin(time * 6.5) * 0.07;
      outerFlame.rotation.x = Math.cos(time * 5.5) * 0.05;

      innerFlame.scale.set(
        1 + flicker * 0.5,
        1 + flicker * 1.1,
        1 + flicker * 0.5
      );
      innerFlame.rotation.z = outerFlame.rotation.z * 0.9;

      flameLight.intensity = 3.6 + flicker * 2.8;

      // Animate upward floating embers
      const emberPos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        const vel = emberVelocities[i];
        vel.life += 0.014;

        emberPos[i * 3] += vel.x + Math.sin(time * 3.5 + i) * 0.0025;
        emberPos[i * 3 + 1] += vel.y;
        emberPos[i * 3 + 2] += vel.z + Math.cos(time * 3.5 + i) * 0.0025;

        if (emberPos[i * 3 + 1] > 3.6 || vel.life > 1) {
          emberPos[i * 3] = (Math.random() - 0.5) * 0.3;
          emberPos[i * 3 + 1] = 1.4;
          emberPos[i * 3 + 2] = 1.78 + (Math.random() - 0.5) * 0.3;
          vel.life = 0;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      latheGeo.dispose();
      beadGeo.dispose();
      oilGeo.dispose();
      wickGeo.dispose();
      outerFlameGeo.dispose();
      innerFlameGeo.dispose();
      brassMaterial.dispose();
      polishedGoldMaterial.dispose();
      oilMaterial.dispose();
      wickMaterial.dispose();
      outerFlameMat.dispose();
      innerFlameMat.dispose();
    };
  }, [enableInteraction]);

  return (
    <div className={`relative flex items-center justify-center pointer-events-auto ${className}`}>
      {/* 3D WebGL Canvas Mount Container (Explicitly transparent, perfectly blended) */}
      <div
        ref={mountRef}
        className="w-[300px] h-[260px] sm:w-[440px] sm:h-[340px] md:w-[520px] md:h-[380px] cursor-grab active:cursor-grabbing select-none bg-transparent"
        style={{ background: 'transparent' }}
        title="Interactive 3D Brass Diya — Move cursor or drag on mobile to rotate"
      />
    </div>
  );
};
