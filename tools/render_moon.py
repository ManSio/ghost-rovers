# render_moon.py: reproject NASA's LRO color map into a near-side Moon view.
# AI-generated code (Claude, Anthropic), reviewed by La Shara Cordero. See AI_DISCLOSURE.md.
# Source data: NASA Goddard SVS CGI Moon Kit, lroc_color_2k.jpg (https://svs.gsfc.nasa.gov/4720)
# Usage: python render_moon.py lroc_color_2k.jpg moon_nearside.webp 1000
import sys, numpy as np
from PIL import Image

src, out, D = sys.argv[1], sys.argv[2], int(sys.argv[3])
tex = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
H, W, _ = tex.shape
ys, xs = np.mgrid[0:D, 0:D].astype(np.float32)
nx = (xs + 0.5) / (D / 2) - 1
ny = 1 - (ys + 0.5) / (D / 2)
r2 = nx**2 + ny**2
nz = np.sqrt(np.clip(1 - r2, 0, 1))
lat = np.arcsin(np.clip(ny, -1, 1))          # orthographic projection, center at 0,0
lon = np.arctan2(nx, nz)
u = ((lon / (2*np.pi)) + 0.5) * (W - 1)        # map is centered on 0 degrees longitude
v = (0.5 - lat / np.pi) * (H - 1)
img = tex[v.astype(int).clip(0, H-1), u.astype(int).clip(0, W-1)]
L = np.array([-0.45, 0.35, 0.82]); L /= np.linalg.norm(L)   # soft light from upper left
shade = np.clip(nx*L[0] + ny*L[1] + nz*L[2], 0, 1)
shade = 0.18 + 0.92 * shade**0.8
img = np.clip(img * shade[..., None] * 1.05, 0, 255)
alpha = (np.clip((1 - np.sqrt(r2)) * D / 2, 0, 1) * 255).astype(np.uint8)
Image.fromarray(np.dstack([img.astype(np.uint8), alpha]), 'RGBA').save(out, 'WEBP', quality=86)
print('saved', out)

# Landing site positions on the disk (percent of width/height):
#   x = 50 * (1 + cos(lat) * sin(lon)),  y = 50 * (1 - sin(lat))
