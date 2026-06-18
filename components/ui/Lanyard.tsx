/* eslint-disable react/no-unknown-property, @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Text, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

const CARD_MODEL = "/assets/lanyard/card.glb";
const PROFILE_IMAGE = "/profile.jpg";
const STRAP_COLOR = "#a06cff";
const USER_ICON_TEXTURE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#8c71ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="10" r="3"/>
  <path d="M7 20.7a7 7 0 0 1 10 0"/>
</svg>
`)}`;

extend({ MeshLineGeometry, MeshLineMaterial });

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -55, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 1024);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`lanyard-wrapper ${isDragging ? "is-dragging" : ""}`}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: !isMobile }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, onDragStart, onDragEnd }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: false,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes } = useGLTF(CARD_MODEL) as any;
  const profileTexture = useTexture(PROFILE_IMAGE);
  const userIconTexture = useTexture(USER_ICON_TEXTURE);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const ropeLength = 0.94;
  const jointStep = ropeLength * 0.5;
  const baseCardScale = 2.25;
  const desktopCardScale = 3.22;
  const cardScale = isMobile ? 1.42 : desktopCardScale;
  const cardRatio = cardScale / baseCardScale;
  const cardAnchorY = 1.45 * cardRatio;
  const cardPositionY = -1.2 * cardRatio;
  const groupY = isMobile ? 4.95 : 4.35;
  const groupX = isMobile ? 0 : -4.45;
  const cardFaceZ = 0.008;
  const cardFaceCenterY = 0.5229;
  const photoWidth = 0.7164;
  const photoHeight = 1;
  const photoRadius = 0.045;
  const photoGeometry = useMemo(() => {
    const x = -photoWidth / 2;
    const y = -photoHeight / 2;
    const width = photoWidth;
    const height = photoHeight;
    const radius = photoRadius;
    const shape = new THREE.Shape();

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    const geometry = new THREE.ShapeGeometry(shape, 24);
    const uv = geometry.attributes.uv;

    for (let i = 0; i < uv.count; i += 1) {
      uv.setXY(i, (uv.getX(i) - x) / width, (uv.getY(i) - y) / height);
    }

    uv.needsUpdate = true;

    return geometry;
  }, [photoHeight, photoRadius, photoWidth]);

  profileTexture.colorSpace = THREE.SRGBColorSpace;
  profileTexture.anisotropy = 8;
  profileTexture.wrapS = THREE.ClampToEdgeWrapping;
  profileTexture.wrapT = THREE.ClampToEdgeWrapping;

  useEffect(() => {
    const image = profileTexture.image as HTMLImageElement | undefined;
    if (!image?.width || !image?.height) return;

    const imageAspect = image.width / image.height;
    const photoAspect = photoWidth / photoHeight;

    profileTexture.center.set(0.5, 0.5);

    const coverZoom = 0.9;

    if (imageAspect > photoAspect) {
      const repeatX = Math.min(1, (photoAspect / imageAspect) / coverZoom);
      profileTexture.repeat.set(repeatX, 1);
      profileTexture.offset.set((1 - repeatX) / 2, 0);
    } else {
      const repeatY = Math.min(1, (imageAspect / photoAspect) / coverZoom);
      profileTexture.repeat.set(1, repeatY);
      profileTexture.offset.set(0, (1 - repeatY) / 2);
    }

    profileTexture.needsUpdate = true;
  }, [profileTexture, photoHeight, photoWidth]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, cardAnchorY, 0],
  ]);

  useEffect(() => {
    if (!hovered) return;

    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current || !band.current) return;

    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));

      ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[groupX, groupY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={"fixed" as RigidBodyProps["type"]} />
        <RigidBody position={[jointStep, 0, 0]} ref={j1} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[jointStep * 2, 0, 0]} ref={j2} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[jointStep * 3, 0, 0]} ref={j3} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[jointStep * 4, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ("kinematicPosition" as RigidBodyProps["type"]) : ("dynamic" as RigidBodyProps["type"])}
        >
          <CuboidCollider args={[0.8 * cardRatio, 1.125 * cardRatio, 0.01]} />
          <group
            scale={cardScale}
            position={[0, cardPositionY, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event: any) => {
              event.target.releasePointerCapture(event.pointerId);
              drag(false);
              onDragEnd?.();
            }}
            onPointerDown={(event: any) => {
              event.target.setPointerCapture(event.pointerId);
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
              onDragStart?.();
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial color="#f8f8fc" clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
            </mesh>
            <mesh geometry={photoGeometry} position={[0, cardFaceCenterY, cardFaceZ]}>
              <meshBasicMaterial map={profileTexture} toneMapped={false} />
            </mesh>
            <group position={[0, cardFaceCenterY, -cardFaceZ]} rotation={[0, Math.PI, 0]}>
              <mesh position={[0, 0.14, 0.002]}>
                <planeGeometry args={[0.24, 0.24]} />
                <meshBasicMaterial map={userIconTexture} transparent toneMapped={false} />
              </mesh>
              <Text
                position={[0, -0.14, 0.003]}
                fontSize={0.11}
                fontWeight={700}
                anchorX="center"
                anchorY="middle"
                renderOrder={20}
              >
                Najib
                <meshBasicMaterial color="#8c71ff" toneMapped={false} depthTest={false} />
              </Text>
            </group>
            <mesh geometry={nodes.clip.geometry}>
              <meshPhysicalMaterial color="#f8f8fc" clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.12} roughness={0.3} metalness={0.68} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshPhysicalMaterial color="#f8f8fc" clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.12} roughness={0.28} metalness={0.72} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={STRAP_COLOR}
          depthTest={false}
          resolution={new THREE.Vector2(1000, isMobile ? 2000 : 1000)}
          toneMapped={false}
          useMap={0}
          repeat={new THREE.Vector2(-4, 1)}
          lineWidth={isMobile ? 0.82 : 1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_MODEL);
