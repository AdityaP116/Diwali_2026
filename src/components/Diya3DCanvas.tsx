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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.8);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // Group to hold complete Diya for tilt / rotation
    const diyaGroup = new THREE.Group();
    scene.add(diyaGroup);

    // --- 1. Materials ---
    // Traditional handcrafted Terracotta Mitti clay material
    const clayMaterial = new THREE.MeshStandardMaterial({
      color: 0x96391a,
      roughness: 0.65,
      metalness: 0.12,
      bumpScale: 0.05,
    });

    // Antique Gold Beaded Trim & Ornament
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe7be70,
      roughness: 0.28,
      metalness: 0.88,
    });

    // Ghee / Sesame Oil Basin Material with warm reflection
    const oilMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c2d12,
      roughness: 0.08,
      metalness: 0.45,
    });

    // Cotton batti / wick
    const wickMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.9,
    });

    // --- 2. Geometry: Terracotta Clay Bowl ---
    // Smooth sculpted lathe profile for authentic Indian Mitti Ka Diya
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.9, 0.04));
    points.push(new THREE.Vector2(1.5, 0.35));
    points.push(new THREE.Vector2(2.1, 0.85));
    points.push(new THREE.Vector2(2.35, 1.2));
    points.push(new THREE.Vector2(2.2, 1.35));
    points.push(new THREE.Vector2(1.95, 1.28));
    points.push(new THREE.Vector2(1.7, 0.9));
    points.push(new THREE.Vector2(1.1, 0.6));
    points.push(new THREE.Vector2(0, 0.5));

    const bowlGeo = new THREE.LatheGeometry(points, 48);
    // Slight organic flattening to form traditional pinched spout (nose) for the wick
    const pos = bowlGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      // Pinch forward at front z > 0.5
      if (z > 0.6 && y > 0.6) {
        x *= 0.72; // pinch sides inwards
        z *= 1.15; // stretch forward
      }
      pos.setXYZ(i, x, y, z);
    }
    bowlGeo.computeVertexNormals();

    const diyaMesh = new THREE.Mesh(bowlGeo, clayMaterial);
    diyaMesh.castShadow = true;
    diyaMesh.receiveShadow = true;
    diyaGroup.add(diyaMesh);

    // --- 3. Beaded Gold Filigree Rim ---
    const beadCount = 36;
    const beadRadius = 0.06;
    const beadGeo = new THREE.SphereGeometry(beadRadius, 12, 12);
    const beadsGroup = new THREE.Group();

    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      let rx = Math.cos(angle) * 2.22;
      let rz = Math.sin(angle) * 2.22;
      if (rz > 0.6) {
        rx *= 0.72;
        rz *= 1.15;
      }
      const bead = new THREE.Mesh(beadGeo, goldMaterial);
      bead.position.set(rx, 1.3, rz);
      beadsGroup.add(bead);
    }
    diyaGroup.add(beadsGroup);

    // --- 4. Oil Basin Pool ---
    const oilGeo = new THREE.CylinderGeometry(1.72, 1.45, 0.12, 32);
    const oilMesh = new THREE.Mesh(oilGeo, oilMaterial);
    oilMesh.position.set(0, 0.88, 0.15);
    diyaGroup.add(oilMesh);

    // --- 5. Cotton Batti (Wick) ---
    const wickGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.45, 12);
    const wickMesh = new THREE.Mesh(wickGeo, wickMaterial);
    wickMesh.position.set(0, 1.15, 1.7);
    wickMesh.rotation.x = Math.PI / 6;
    diyaGroup.add(wickMesh);

    // --- 6. 3D Flame Hierarchy ---
    // Outer Flame Corona (Warm Orange/Amber Glow)
    const outerFlameGeo = new THREE.ConeGeometry(0.32, 1.1, 24);
    outerFlameGeo.translate(0, 0.55, 0);
    const outerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xff7a33,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat);
    outerFlame.position.set(0, 1.25, 1.72);
    diyaGroup.add(outerFlame);

    // Inner Radiant Flame Core (Ivory White / Gold)
    const innerFlameGeo = new THREE.ConeGeometry(0.18, 0.75, 20);
    innerFlameGeo.translate(0, 0.38, 0);
    const innerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xfff3da,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const innerFlame = new THREE.Mesh(innerFlameGeo, innerFlameMat);
    innerFlame.position.set(0, 1.26, 1.72);
    diyaGroup.add(innerFlame);

    // Blue Fire Base
    const blueFlameGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const blueFlameMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const blueFlame = new THREE.Mesh(blueFlameGeo, blueFlameMat);
    blueFlame.position.set(0, 1.28, 1.72);
    blueFlame.scale.set(1, 0.5, 1);
    diyaGroup.add(blueFlame);

    // --- 7. Dynamic Lights ---
    // Central Flame Point Light (illuminates diya body & scene)
    const flameLight = new THREE.PointLight(0xffb347, 3.8, 12, 1.2);
    flameLight.position.set(0, 1.8, 1.72);
    flameLight.castShadow = true;
    flameLight.shadow.bias = -0.002;
    diyaGroup.add(flameLight);

    // Secondary Warm Ambient Floor Glow Light
    const floorGlowLight = new THREE.PointLight(0xff7a33, 1.5, 6);
    floorGlowLight.position.set(0, 0.2, 0);
    diyaGroup.add(floorGlowLight);

    // Hemisphere Ambient Lighting
    const hemiLight = new THREE.HemisphereLight(0x171f35, 0x080b18, 0.75);
    scene.add(hemiLight);

    // Soft Rim Light from Back
    const rimLight = new THREE.DirectionalLight(0xe7be70, 0.8);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Ground Shadow Catcher
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // --- 8. Rising Embers Particle Cloud ---
    const emberCount = 38;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities: { x: number; y: number; z: number; life: number }[] = [];

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      emberPositions[i * 3 + 1] = 1.3 + Math.random() * 2;
      emberPositions[i * 3 + 2] = 1.72 + (Math.random() - 0.5) * 0.4;
      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: 0.018 + Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.015,
        life: Math.random(),
      });
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffe194,
      size: 0.075,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const emberParticles = new THREE.Points(emberGeo, emberMat);
    diyaGroup.add(emberParticles);

    // --- Interactive Hover & Orbit Controls ---
    let targetRotY = 0;
    let targetRotX = 0.15;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      if (!enableInteraction) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = mouseX * 0.65;
      targetRotX = 0.15 - mouseY * 0.25;
    };

    container.addEventListener('mousemove', onPointerMove);

    // Touch support for mobile rotation
    const onTouchMove = (e: TouchEvent) => {
      if (!enableInteraction || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      targetRotY = mouseX * 0.7;
    };
    container.addEventListener('touchmove', onTouchMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth damped rotation on mouse move
      diyaGroup.rotation.y += (targetRotY - diyaGroup.rotation.y) * 0.06;
      diyaGroup.rotation.x += (targetRotX - diyaGroup.rotation.x) * 0.06;

      // Realistic Non-linear Multi-harmonic Flame Flicker
      const flicker1 = Math.sin(time * 9.5) * 0.07;
      const flicker2 = Math.cos(time * 14.2) * 0.05;
      const flicker3 = Math.sin(time * 22.0) * 0.03;
      const totalFlicker = flicker1 + flicker2 + flicker3;

      // Scale flame body organically
      outerFlame.scale.set(
        1 + totalFlicker * 0.8,
        1 + totalFlicker * 1.5,
        1 + totalFlicker * 0.8
      );
      outerFlame.rotation.z = Math.sin(time * 7) * 0.08;
      outerFlame.rotation.x = Math.cos(time * 6) * 0.06;

      innerFlame.scale.set(
        1 + totalFlicker * 0.6,
        1 + totalFlicker * 1.2,
        1 + totalFlicker * 0.6
      );
      innerFlame.rotation.z = outerFlame.rotation.z * 0.9;

      // Light intensity pulsates with flame
      flameLight.intensity = 3.8 + totalFlicker * 3.2;

      // Animate upward floating embers
      const emberPos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        const vel = emberVelocities[i];
        vel.life += 0.015;

        emberPos[i * 3] += vel.x + Math.sin(time * 4 + i) * 0.003;
        emberPos[i * 3 + 1] += vel.y;
        emberPos[i * 3 + 2] += vel.z + Math.cos(time * 4 + i) * 0.003;

        // Reset ember after height
        if (emberPos[i * 3 + 1] > 3.8 || vel.life > 1) {
          emberPos[i * 3] = (Math.random() - 0.5) * 0.35;
          emberPos[i * 3 + 1] = 1.35;
          emberPos[i * 3 + 2] = 1.72 + (Math.random() - 0.5) * 0.35;
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
      bowlGeo.dispose();
      beadGeo.dispose();
      oilGeo.dispose();
      wickGeo.dispose();
      outerFlameGeo.dispose();
      innerFlameGeo.dispose();
      clayMaterial.dispose();
      goldMaterial.dispose();
      oilMaterial.dispose();
      wickMaterial.dispose();
      outerFlameMat.dispose();
      innerFlameMat.dispose();
    };
  }, [enableInteraction]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="w-[320px] h-[280px] sm:w-[460px] sm:h-[360px] md:w-[540px] md:h-[400px] cursor-grab active:cursor-grabbing select-none"
        title="Interactive 3D Diya — Move cursor or touch to rotate"
      />
    </div>
  );
};
