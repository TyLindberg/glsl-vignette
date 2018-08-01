import * as dat from 'dat.gui';
import glToy from './toy.js';
import simpleVignette from './shaders/simple.frag';

// Uniforms for the simple vignette function
let simpleUniforms = {
    radius: 0.5,
    smoothness: 0.5
};
const simpleUpdate = function(gl, shader) {
    shader.uniforms.screenSize = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    shader.uniforms.radius = simpleUniforms.radius;
    shader.uniforms.smoothness = simpleUniforms.smoothness;
};

// Creates a full screen canvas with the fragment shader simpleVignette applied
let toy = glToy(simpleVignette, simpleUpdate);
toy.render();

window.addEventListener('resize', function () {
    toy.resize();
    toy.render();
});

// Add controls for user to manually adjust vignette settings
const guiChanged = function() {
    toy.render();
};
const gui = new dat.GUI();

gui.add(simpleUniforms, 'radius', 0.0, 1.0, 0.01).onChange(guiChanged);
gui.add(simpleUniforms, 'smoothness', 0.0, 2.0, 0.01).onChange(guiChanged);
