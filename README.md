# Internal-Tempo
An application for musicians to help improve their internal sense of time by providing custom exercises based around a sparse metronome click
It is currently still in development (however, it is completely functional)

# Information
The functionality for the metronome is all built into the Javascript for the webpage. Django is merely the host for the page.
I'm planning to create more helpful apps for musicians and integrate them all into this Django project

# How to Run
__1.__ Clone the repository </br>
__2.__ Open the project in your IDE of choice</br>
__3.__ Change to the project root directory (if not already there)
```
cd <project_root_directory>
```
__4.__ Run 
```
python manage.py createsuperuser
``` 
__5.__ Enter valid credentials </br>
__6.__ Run 
```
python manage.py runserver
```
__7.__ Visit http://localhost:8000/ in your browser </br>
