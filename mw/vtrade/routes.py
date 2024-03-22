import hashlib
from django.http import JsonResponse
from .models import User


# adding user
def add_user(user_input):
    first_name, last_name, email, username, password = user_input
    hashed_password = hashlib.sha256(password.replace(" ", "").encode()).hexdigest()

    # Create a new user object with the provided data
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        username=username,
        password=hashed_password,
    )

    instance = User.objects.create(new_user)

    return JsonResponse({"message": "Data created successfully"})
