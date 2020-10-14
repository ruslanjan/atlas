# DNI tiles
gdal_translate -of VRT -ot Byte -scale GEOTIFF/DNI.tif temp.vrt
gdal2tiles.py --profile=mercator -z 1-12 temp.vrt tiles/dni
# GHI tiles
#gdal_translate -of VRT -ot Byte -scale GEOTIFF/GHI.TIF temp.vrt
#gdal2tiles.py --profile=mercator -z 1-12 temp.vrt tiles/dni

rm temp.vrt