# glsl-vignette
A GLSL function for computing vignette values from UV coordinates. Designed to work with [glslify](https://github.com/glslify/glslify). To test out how the different vignettes look, a demo can be found [here](https://tylindberg.github.io/glsl-vignette/).

[![NPM](https://nodei.co/npm/glsl-vignette.png?mini)](https://nodei.co/npm/glsl-vignette/)

# Usage

### ```#pragma glslify: vignette = require(glsl-vignette/simple)```
#### ```float vignette(vec2 uv, float radius, float smoothness)```
Returns a value from 0 to 1 (black to white) corresponding to the intensity of the vignette at that UV coordinate.

`uv` - UV coordinates, expected to be in the range 0 to 1 on both axes.

`radius` - the vignette's radius in UV coordinates. A radius of 0.5 results in a vignette that will just touch the edges of the UV coordinate system.

`smoothness` - how quickly the vignette fades in. The vignette will start fading in at `radius - smoothness` and be fully opaque at `radius + smoothness` from the center. A value of zero results in a hard edge.

#### Example:
```glsl
#pragma glslify: vignette = require(glsl-vignette)

uniform sampler2D tex;
varying vec2 uv;

void main() {
    float vignetteValue = vignette(uv, 0.5, 0.5);
    gl_FragColor = texture2D(tex, uv) * vignetteValue;
}
```

### ```#pragma glslify: vignette = require(glsl-vignette/advanced)```
#### ```float vignette(vec2 uv, vec2 size, float roundness, float smoothness)```
Returns a value from 0 to 1 (black to white) corresponding to the intensity of the vignette at that UV coordinate. Allows for fine-grained control of the vignette shape and size.

`uv` - UV coordinates, expected to be in the range 0 to 1 on both axes.

`size` - the size of the vignette in the form (width / 2, height / 2). To make a vignette that starts fading in halfway between the center and edges of UV space you would pass in `vec2(0.25, 0.25)`.

`roundness` - how round the vignette will be. A value from 0 to 1 where 1 is perfectly round (forming a circle or oval) and 0 is not round at all (forming a square or rectangle).

`smoothness` - how quickly the vignette fades in. The vignette will start fading in at the edge of the values provided by `size`, and will be fully faded in at `vec2(size.x + smoothness, size.y + smoothness)`. A value of zero results in a hard edge.

#### Example:
```glsl
#pragma glslify: vignette = require(glsl-vignette/advanced)

uniform sampler2D tex;
varying vec2 uv;

void main() {
    // Create a boxy vignette that is wider than it is tall
    float vignetteValue = vignette(uv, vec2(0.4, 0.3), 0.7, 0.1);
    gl_FragColor = texture2D(tex, uv) * vignetteValue;
}
```
