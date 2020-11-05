FROM python:3.8.6-slim-buster
ADD requirements.txt /code/
WORKDIR /code
RUN pip install -r requirements.txt

COPY /atlas/ /code/atlas

EXPOSE 5000
#CMD ["python","main_file.py"]
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "atlas.wsgi:app"]
