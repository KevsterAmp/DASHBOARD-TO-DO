# How to run Django backend

1. create a virtual environment using venv (*python should be installed beforehand*)
```
py -m venv env
```

Windows
```
source env/Scripts/activate
```

MacOS/Linux
```
source env/bin/activate
```

2. install needed libraries
```
pip install -r requirements.txt
```

3. django shenannigans setup (*jsut paste all the commands lolol*)
```
py manage.py makemigrations accounts
py manage.py migrate
py manage.py collectstatic 
```

then finally,
```
py manage.py runserver
```

4. Access locally deployed website on [localhost](127.0.0.1:8000) 
<br>
`localhost:8000` or `127.0.0.1:8000`


## TODO
- TodoCreateView
- TodoEditView
- Delete logic
- re-implement javascript for tag filter and drag and drop
- Only users that created their tasks can access and see them
- Redirect to login site when not logged in
- Improve login, signup website


## Server Logic
- creating, editing, deleting todos handled by Django
- filtering on different tags, drag and drop, handled by js


