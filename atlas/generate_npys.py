import numpy as np

folder = 'AAIGRID'

names = ['DNI']

for name in names:
    data = np.loadtxt(folder + "/DNI.asc", skiprows=6)
    np.save(f'{name}.npy', data)