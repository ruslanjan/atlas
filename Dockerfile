FROM python:3.8.6-slim-buster
ADD requirements.txt /code/
WORKDIR /code
RUN pip install -r requirements.txt

COPY /atlas/ /code/atlas

#RUN apt-get update
#RUN apt-get install -y software-properties-common
#RUN add-apt-repository ppa:ubuntugis/ppa && sudo apt-get update
RUN apt-get update
RUN apt-get install -y gdal-bin
RUN apt-get install -y python-gdal

WORKDIR /code/atlas
#RUN sh generate_tiles.sh
#RUN python generate_npys.py
WORKDIR /code

EXPOSE 5000
#CMD ["python","main_file.py"]
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "atlas.wsgi:app"]