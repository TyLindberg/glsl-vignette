precision highp float;

#pragma glslify: vignette = require('glsl-vignette')

uniform vec2 screenSize;
uniform float radius;
uniform float smoothness;

void main() {
    vec2 uv = gl_FragCoord.xy / screenSize;
    gl_FragColor = vec4(vec3(vignette(uv, radius, smoothness)), 1.0);
}
