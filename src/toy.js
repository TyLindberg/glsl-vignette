// The MIT License (MIT)

// Copyright (c) 2014

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// I decided to rework this file so that it would not constantly be rendering
// every frame. Allowing us to update it only when parameters are changed

const triangle = require('a-big-triangle');
const context = require('gl-context');
const fit = require('canvas-fit');
const Shader = require('gl-shader');

module.exports = toy;

const vert = `
precision mediump float;
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 1, 1);
}
`.trim();

// String -> WebGLRenderingContext, Shader
function toy(frag, cb) {
    const canvas = document.body.appendChild(document.createElement('canvas'));
    const gl = context(canvas);
    const shader = Shader(gl, vert, frag);
    const fitter = fit(canvas);

    const render = function() {
        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        gl.viewport(0, 0, width, height);

        shader.bind();
        cb(gl, shader);
        triangle(gl);
    };

    const update = function(frag) {
        shader.update(vert, frag);
    };

    window.addEventListener('resize', fitter, false);

    return {
        update: update,
        resize: fitter,
        shader: shader,
        canvas: canvas,
        gl: gl,
        render: render
    };
}
