import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export type SilkState = { dark: boolean; burst: number };

const vertexShader = `
uniform float uT;
uniform float uB;
uniform vec2 uMouse;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
float H(vec2 p) {
  float waves = sin(p.x * .68 + p.y * .36 + uT * .28) * .72
    + sin(p.x * 1.05 - p.y * .7 - uT * .22) * .35
    + sin(p.y * 1.3 + p.x * .22 + uT * .17) * .28;
  float d = distance(p, uMouse);
  float bump = exp(-d*d*.22) * .7;
  float ripple = sin(d*4.2 - uT*3.) * exp(-d*.22) * uB*.35;
  return waves + bump + ripple;
}
void main() {
  vUv = uv;
  vec3 p = position;
  p.z += H(p.xy);
  float eps = .06;
  vec3 n = normalize(vec3(-(H(p.xy + vec2(eps,0.))-H(p.xy-vec2(eps,0.)))/(2.*eps),
    -(H(p.xy+vec2(0.,eps))-H(p.xy-vec2(0.,eps)))/(2.*eps),1.));
  vNormal = normalize(normalMatrix * n);
  vec4 mv = modelViewMatrix * vec4(p,1.);
  vPosition = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = `
uniform float uD;
uniform vec3 uDarkBase; uniform vec3 uDarkMid; uniform vec3 uDarkHi;
uniform vec3 uLightBase; uniform vec3 uLightMid; uniform vec3 uLightHi;
varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
void main() {
  vec3 n = normalize(vNormal);
  vec3 view = normalize(-vPosition);
  vec3 light = normalize(vec3(-.5,1.2,1.4));
  float diffuse = max(dot(n,light),0.);
  float spec = pow(max(dot(n,normalize(light+view)),0.),28.);
  float fresnel = pow(1.-abs(dot(n,view)),2.3);
  vec3 base = mix(uLightBase,uDarkBase,uD);
  vec3 mid = mix(uLightMid,uDarkMid,uD);
  vec3 hi = mix(uLightHi,uDarkHi,uD);
  vec3 col = mix(base,mid,diffuse*.85);
  float sheen = clamp(spec*.7+fresnel*.52,0.,.85);
  col = mix(col,hi,sheen*mix(.14,1.,uD));
  float edge = smoothstep(0.,.13,vUv.x)*smoothstep(0.,.13,1.-vUv.x)
    *smoothstep(0.,.18,vUv.y)*smoothstep(0.,.18,1.-vUv.y);
  gl_FragColor = vec4(col,edge*.98);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function SilkBackground({ state }: { state: MutableRefObject<SilkState> }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, .1, 60);
    camera.position.set(0, 2.2, 10);
    const css = getComputedStyle(document.documentElement);
    const color = (token: string) => new THREE.Color(css.getPropertyValue(token).trim());
    let dk = state.current.dark ? 1 : 0;
    const uniforms = {
      uT: { value: 0 }, uB: { value: 0 }, uD: { value: dk },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDarkBase: { value: color("--silk-dark-base") },
      uDarkMid: { value: color("--silk-dark-mid") },
      uDarkHi: { value: color("--silk-dark-hi") },
      uLightBase: { value: color("--silk-light-base") },
      uLightMid: { value: color("--silk-light-mid") },
      uLightHi: { value: color("--silk-light-hi") },
    };
    const geometry = new THREE.PlaneGeometry(18, 11, 170, 110);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -1.05;
    plane.position.y = -1.8;
    scene.add(plane);
    const positions = new Float32Array(700 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - .5) * 24;
      positions[i + 1] = (Math.random() - .5) * 15;
      positions[i + 2] = (Math.random() - .5) * 8 - 2;
    }
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const darkPoint = color("--silk-particle-dark");
    const lightPoint = color("--silk-particle-light");
    const pointMaterial = new THREE.PointsMaterial({ size: .035, color: darkPoint, transparent: true, opacity: .48, depthWrite: false });
    const points = new THREE.Points(pointsGeometry, pointMaterial);
    scene.add(points);
    const mouse = new THREE.Vector2();
    let scroll = window.scrollY;
    const onMouse = (event: MouseEvent) => { mouse.set(event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2); };
    const onScroll = () => { scroll = window.scrollY; };
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = performance.now();
    let time = 0;
    const animate = (now: number) => {
      const delta = Math.min((now - previous) / 1000, .05);
      previous = now;
      time += delta * (reduced.matches ? .15 : 1);
      dk += ((state.current.dark ? 1 : 0) - dk) * .05;
      uniforms.uD.value = dk;
      uniforms.uT.value = time;
      uniforms.uB.value = state.current.burst;
      state.current.burst *= .96;
      uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x * 7, mouse.y * 4), .035);
      const movement = reduced.matches ? .15 : 1;
      camera.position.x += (mouse.x * .35 * movement - camera.position.x) * .025;
      camera.position.y += (2.2 + mouse.y * .2 * movement - Math.min(scroll / window.innerHeight, 3) * .28 - camera.position.y) * .025;
      camera.lookAt(0, -.5, 0);
      plane.rotation.z = Math.min(scroll / window.innerHeight, 4) * .025;
      points.rotation.y = time * .014;
      points.position.y = Math.sin(time * .12) * .16;
      pointMaterial.color.copy(lightPoint).lerp(darkPoint, dk);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose(); material.dispose(); pointsGeometry.dispose(); pointMaterial.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [state]);
  return <div ref={host} className="silk-background" aria-hidden="true" />;
}