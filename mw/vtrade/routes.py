import hashlib
from django.http import JsonResponse
from .models import CustomUser


# adding user
def add_user(user_input):
    first_name, last_name, class_year, email, username, password = user_input
    hashed_password = hashlib.sha256(password.replace(" ", "").encode()).hexdigest()

    # Create a new user object with the provided data
    new_user = CustomUser(
        first_name=first_name,
        last_name=last_name,
        email=email,
        username=username,
        password=hashed_password,
        classyear=class_year,
    )

    instance = CustomUser.objects.create(new_user)

    return JsonResponse({"message": "Data created successfully"})


def update_user(user_input):
    # Parse the user input
    parsed_input = parse_user_input(user_input)

    # Get the user object to update
    user_id = parsed_input.get("id")  # Assuming 'id' is provided in user_input
    try:
        user = CustomUser.objects.get(pk=user_id)
    except CustomUser.DoesNotExist:
        return {"error": "User not found"}, 404

    # Update the user object with the provided fields
    for field, value in parsed_input.items():
        if hasattr(user, field):
            setattr(user, field, value)

    # Save the updated user object
    user.save()

    return {"message": "User updated successfully"}


def parse_user_input(user_input):
    parsed_data = {}

    # implement logic for parsing
    # for value in user_input:

    return parsed_data


def get_user(id):
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    return user


def delete_user(id):
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    user.delete()

    return JsonResponse({"message": "User deleted successfully"})
