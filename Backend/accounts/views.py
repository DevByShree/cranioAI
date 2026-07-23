from django.http import JsonResponse
from django.contrib.auth.models import User 
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json 

@csrf_exempt 
def signup(request):

    if request.method == "POST":

        data = json.loads(request.body)

        username = data["username"]
        email = data["email"]
        password = data["password"]

        if User.objects.filter(username = username).exists():
            return JsonResponse({
                "message":"Username already exists"
            })

        User.objects.create_user(
            username = username,
            email = email,
            password = password
        )

        return JsonResponse({
            "message":"User created Successfully"
        })
    
    return JsonResponse({
        "message":"Invaild Request"
    })

@csrf_exempt
def login(request):

    if request.method == "POST":

        data = json.loads(request.body)

        email = data["email"]
        password = data["password"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({
                "message": "Email not found" 
            })

        authenticated_user = authenticate(
            username = user.username,
            password = password
        )
        
        if authenticated_user is not None:
            return JsonResponse({
                "message": "Login Successful",
                "username": authenticated_user.username,
                "email" : authenticated_user.email,
            })

        return JsonResponse({
            "message": "Invalid Username or Password"
        })

    return JsonResponse({
        "message": "Invalid Request"
    })