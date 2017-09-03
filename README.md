# glsl-vignette
A GLSL function for computing vignette value given UV coordinates.

# Usage
#### ```float vignette(vec2 uv, float radius, float smoothness)```
Returns a value from 0 to 1 (black to white) corresponding to the intensity of the vignette at that UV coordinate.

Radius - the vignette's radius in UV coordinates. A radius of 0.5 results in a vignette that will just touch the edges of the UV coordinate system.

Smoothness - how quickly the vignette fades in. The vignette will start fading in at `radius - smoothness` and be fully opaque at `radius + smoothness` from the center. A value of zero results in a hard edge.

GLSL fragment shader example:
```glsl
#pragma glslify: vignette = require(glsl-vignette)

uniform sampler2D tex;
varying vec2 uv;

void main() {
    float vignetteValue = vignette(uv, 0.5, 0.5);
    gl_FragColor = texture2D(tex, uv) * vignetteValue;
}
```
