precision highp float;

#pragma glslify: vignette = require('glsl-vignette/advanced')

uniform vec2 screenSize;
uniform vec2 size;
uniform float roundness;
uniform float smoothness;

void main() {
    vec2 uv = gl_FragCoord.xy / screenSize;
    gl_FragColor = vec4(vec3(vignette(uv, size, roundness, smoothness)), 1.0);
}
