# Kayak Replika

Simple and small webapp based on the Kayak Booking site. It doesn't contains all functionalities like the real webapp beccause the priority here was to build it's backend and frontend. 
## Getting Started

To get you started you migth need some specific frameworks previously installed in your machine. To the frontend project you just need to clone the project and install dependencies. However, for the backend there are some extra steps that you will need.

### Prerequisites for Frontend

All you need to run the frontend is have installed:

```
Angular CLI (7.3.7)
```

### Installing & Running the Frontend
Once you you clone the project go to Kayakfrontend folder and run:
```
npm install
ng serve
```

It will automatically start up the project on 

```
localhost:5000. 
``` 

### Prerequisites for Backend
```
Conda (Python 3.7)
Django (2.1)
DjangoRestFramework (3.9.2)
```

### Installing Conda (Python 3.7) & Django (2.1), and Django Rest Framework (3.9.2)

Conda is an open source package management system and environment management system for many languages. We are going to use it as environment for Python. Also, we are going to use Django whom is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. And finally at complement; Django REST framework that is a powerful and flexible toolkit for building Web APIs.

#### Conda
For installing Conda in your machine follow the steps:


```
Download Conda here: https://www.anaconda.com/distribution/#download-section
```

Open the software and install it as usual. If you want you can add the enviroment path during the installation (It will give you and option for that). 
Once installed, you will need to create an enviroment. For that task you might need to open the cmd/terminal and follow the next commands:

1. Activating Conda
```
If you are using Windows: conda activate
If you are on Mac/Linux: source activate
```

2. Creating a new Enviroment (myenv can be replaced, it is the name of the enviroment)
```
conda create --name myenv
```
Confirm the creation by pressing the key Y.

3. Switch to the new Enviroment
```
conda activate myenv
```

#### Django
4. Install Django Web Framework
```
conda install -c anaconda django
```
After Django is installed it's time to install DRF.

#### Django Rest Framework (DRF)
You can install Django Rest Framework by two ways:

5. Install Django Rest Framework
 
```
Using Conda:
conda install -c conda-forge djangorestframework
```
  or
```
Using PIP:
pip install djangorestframework
```
There is a last package to install, so just use pip and install: 
```
pip install django-filter
```
Ok, now you should be able to run the backend project.

### Running the Frontend
Now navigate to the Kayakbackend, then go inside kayak folder and write the next commands:

```
python manage.py makemigrations kayak_app
```
then
```
python manage.py migrate
```
finally
```
python manage.py runserver
```

And that's it. You can access the api in the localhost:8000

End with an example of getting some data out of the system or using it for a little demo


## Built With

* [Angular CLI](https://angular.io/guide/quickstart) - Frontend framework.
* [Django](https://docs.djangoproject.com/en/2.1/topics/install/) - Web Framework.
* [Django Rest Framework](https://www.django-rest-framework.org/#installation) - Backend Framework.

## Acknowledgments

* This project was inspired by Kayak Booking and there is no intend to falsificate it.
