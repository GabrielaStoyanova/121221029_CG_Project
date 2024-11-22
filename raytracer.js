const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to trace a ray and determine color
function traceRay(origin, direction) {
    const sphereCenter = { x: 400, y: 300, z: 0 };
    const sphereRadius = 100;
    const color = { r: 0, g: 0, b: 255 }; // Blue color

    // Ray-sphere intersection
    const a = direction.x ** 2 + direction.y ** 2 + direction.z ** 2;
    const oc = { x: origin.x - sphereCenter.x, y: origin.y - sphereCenter.y, z: origin.z - sphereCenter.z };
    const b = 2.0 * (oc.x * direction.x + oc.y * direction.y + oc.z * direction.z);
    const c = oc.x ** 2 + oc.y ** 2 + oc.z ** 2 - sphereRadius ** 2;
    const discriminant = b ** 2 - 4 * a * c;

    if (discriminant > 0) {
        // Ray hits the sphere
        return color;
    }

    // Ray misses the sphere
    return { r: 0, g: 0, b: 0 }; // Background color (black)
}

// Render the scene
function render() {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            // Create a ray from the camera (origin)
            const origin = { x: 400, y: 300, z: -500 }; // Camera position
            const direction = {
                x: (x - canvas.width / 2) / canvas.width,
                y: (y - canvas.height / 2) / canvas.height,
                z: 1 // Forward direction
            };

            const color = traceRay(origin, direction);
            ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

render();