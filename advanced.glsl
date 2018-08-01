// Based on distance functions found at:
// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float sdSquare(vec2 point, float width) {
	vec2 d = abs(point) - width;
	return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float vignette(vec2 uv, vec2 size, float roundness, float smoothness) {
	// Center UVs
	uv -= 0.5;

	// Rescale UVs to be uniform
	float minWidth = min(size.x, size.y);
	uv.x *= minWidth / size.x;
	uv.y *= minWidth / size.y;

	// Signed distance calculation
	float boxSize = minWidth * (1.0 - roundedness);
	float dist = sdSquare(uv, boxSize) - (minWidth * roundedness);

	return smoothstep(0.0, smoothness, dist);
}

#pragma glslify: export(vignette)
