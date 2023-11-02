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
- Add Signup Button when not signed in
- Change Log In button Icon
- Redirect to login site when not logged in
- Only users that created their tasks can access and see them
- Improve login, signup website