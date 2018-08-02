import * as dat from 'dat.gui';
import glToy from './toy.js';
import simpleVignette from './shaders/simple.frag';
import advancedVignette from './shaders/advanced.frag';

const vignetteTypes = [
    'Simple',
    'Advanced'
]
let vignetteProps = {
    type: 'Simple'
};

// Setup full screen shader

// Shader uniforms
let simpleUniforms = {
    radius: 0.5,
    smoothness: 0.5
};

let advancedUniforms = {
    width: 0.25,
    height: 0.25,
    roundness: 0.25,
    smoothness: 0.1
};

const shaderUpdate = function(gl, shader) {
    shader.uniforms.screenSize = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    if (vignetteProps.type === 'Simple') {
        shader.uniforms.radius = simpleUniforms.radius;
        shader.uniforms.smoothness = simpleUniforms.smoothness;
    } else if (vignetteProps.type === 'Advanced') {
        shader.uniforms.size = [advancedUniforms.width, advancedUniforms.height];
        shader.uniforms.roundness = advancedUniforms.roundness;
        shader.uniforms.smoothness = advancedUniforms.smoothness;
    }
};

// Creates a full screen canvas with the fragment shader simpleVignette applied
let toy = glToy(simpleVignette, shaderUpdate);
toy.render();

window.addEventListener('resize', function () {
    toy.resize();
    toy.render();
});

// Setup GUI Controls
const gui = new dat.GUI();

const typeController = gui.add(vignetteProps, 'type', vignetteTypes);

// Only render when something has been changed in the controls
const guiChanged = function() {
    toy.render();
};

const simpleFolder = gui.addFolder('Simple Vignette Options');
simpleFolder.add(simpleUniforms, 'radius', 0.0, 1.0, 0.01).onChange(guiChanged);
simpleFolder.add(simpleUniforms, 'smoothness', 0.0, 1.0, 0.01).onChange(guiChanged);

const advancedFolder = gui.addFolder('Advanced Vignette Options');
advancedFolder.add(advancedUniforms, 'width', 0.0, 0.5, 0.01).onChange(guiChanged);
advancedFolder.add(advancedUniforms, 'height', 0.0, 0.5, 0.01).onChange(guiChanged);
advancedFolder.add(advancedUniforms, 'roundness', 0.0, 1.0, 0.01).onChange(guiChanged);
advancedFolder.add(advancedUniforms, 'smoothness', 0.0, 1.0, 0.01).onChange(guiChanged);

const changeGUIType = function() {
    switch (vignetteProps.type) {
        case 'Simple':
            toy.update(simpleVignette);
            break;
        case 'Advanced':
            toy.update(advancedVignette);
            break;
        default:
            console.error('Unrecognized vignette type: ' + type);
    }
    toy.render();
};

typeController.onChange(changeGUIType);
changeGUIType('Simple');
