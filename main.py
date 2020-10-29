import io
from flask_cors import CORS, cross_origin
from flask import Flask, send_file
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
from PIL import Image
import os
import json
import matplotlib.image as mpimg

Image.MAX_IMAGE_PIXELS = None

# img = np.loadtxt("DNI.asc", skiprows=6)
dni = np.load('DNI.npy', mmap_mode='r')

app = Flask(__name__)
CORS(app)


def world2pixel_yours(lat, lng):  # x is Longitude and y is Latitude
    # 40 N  46 E
    # lat   lng
    ulX = 46.000000000000  # lng
    # ulY = 40.000000000000
    ulY = 56.000000000000  # lat
    cols = 16800
    rows = 6400
    e = 0.002500000000

    y = int((lng - ulX) / e)
    x = int((ulY - lat) / e)
    if y < 0 or y > dni.shape[1] or x < 0 or x > dni.shape[0]:
        return -1, -1
    return (x, y)


def LA2CM(img_src, cm):
    cm = mpl.cm.get_cmap(cm)
    im = np.array(img_src.convert("L"))
    im = cm(im)
    im = np.uint8(im * 255)
    im = Image.fromarray(im)
    # Now we need to add alpha channel
    src = np.array(im)
    src = src[:, :, :3]
    alpha = np.array(img_src)
    alpha = alpha[:, :, 1:2]
    res = np.concatenate((src, alpha), axis=2)
    ans = Image.fromarray(res)
    return ans


@app.route('/dni/<z>/<x>/<y>.png')
@cross_origin()
def dni_tile(z, x, y):
    z, x, y = int(z), int(x), int(y)
    color = (0, 0, 0, 0)
    img = Image.new('RGBA', (256, 256), color)

    if os.path.isfile(f'tiles/dni/{z}/{x}/{y}.png'):
        img = Image.open(f'tiles/dni/{z}/{x}/{y}.png')
        img = LA2CM(img, 'plasma')
    file_object = io.BytesIO()
    img.save(file_object, 'PNG')
    # move to beginning of file so `send_file()` it will read from start
    file_object.seek(0)
    return send_file(file_object, mimetype='image/PNG')


@app.route('/dni/<lat>/<lng>')
@cross_origin()
def get_dni(lat, lng):
    (x, y) = world2pixel_yours(float(lat), float(lng))
    if (x, y) == (-1, -1) or np.isnan(dni[x][y]):
        return json.dumps({
            'irradiation': -1
        })
    return json.dumps({
        'irradiation': dni[x][y]
    })
